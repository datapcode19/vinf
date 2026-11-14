import { localURL } from './routes.js';

let modelViewerReady;
function loadModelViewer() {
  // Không tải thư viện WebGL cho các trang chỉ có ảnh 2D.
  if (!modelViewerReady) {
    modelViewerReady =
      import('https://cdn.jsdelivr.net/npm/@google/model-viewer@4.1.0/dist/model-viewer.min.js').catch(
        (error) => {
          modelViewerReady = null;
          throw error;
        },
      );
  }
  return modelViewerReady;
}

export function mountVehicleViewer(root, config, { stage, swatches, name }) {
  root.dataset.vehicleViewer = config.id;
  root.dataset.viewerMode = '2d';
  stage.classList.add('viewer-stage');
  stage.tabIndex = 0;
  stage.setAttribute(
    'aria-label',
    'Ảnh xe: dùng +/− để thu phóng, Home để đặt lại',
  );
  const buttons = [...(swatches?.querySelectorAll('button') || [])];
  const colors = config.colors || [];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let mode = '2d',
    zoom = 1,
    frame = 0,
    request = 0,
    model = null,
    timer = null,
    loadTimer = null;
  let selected = Math.max(
    0,
    buttons.findIndex(
      (button) => button.getAttribute('aria-pressed') === 'true',
    ),
  );
  const hasSequence =
    colors.length > 0 &&
    colors.every(
      (color) =>
        color.frames?.length >= 12 &&
        color.fullCircle === true &&
        color.source &&
        color.framesLicense,
    );
  const hasModel = Boolean(
    config.model?.src && config.model?.license && config.model?.source,
  );
  const controls = document.createElement('div');
  controls.className = 'viewer-controls';
  controls.innerHTML = `<button type="button" data-viewer-zoom-out aria-label="Thu nhỏ ảnh xe">−</button>
    <button type="button" data-viewer-reset>Đặt lại góc nhìn</button>
    <button type="button" data-viewer-zoom-in aria-label="Phóng to ảnh xe">+</button>`;
  const note = document.createElement('p');
  note.className = 'viewer-note';
  note.textContent =
    'Ảnh 2D tham chiếu; màu và trang bị có thể khác giữa các phiên bản. ' +
    config.missing;
  if (!buttons.length)
    note.textContent += ' Chưa có bộ ảnh màu riêng đã xác minh cho mẫu xe này.';
  if (buttons.length === 1)
    note.textContent +=
      ' Hiện chỉ có ảnh một màu đã xác minh; chưa hỗ trợ đổi sang màu khác.';
  const note2D = note.textContent;
  const status = document.createElement('p');
  status.className = 'viewer-note';
  status.setAttribute('role', 'status');
  const credit = document.createElement('p');
  credit.className = 'viewer-note';
  credit.hidden = true;
  const interactive = document.createElement('div');
  interactive.className = 'viewer-interactive';
  interactive.hidden = true;
  interactive.tabIndex = 0;
  interactive.setAttribute(
    'aria-label',
    'Góc nhìn xe: phím mũi tên để xoay, +/− để thu phóng, Home để đặt lại',
  );
  stage.after(interactive);
  root.append(controls, status, note, credit);
  const modeButtons = [];
  if (hasSequence || hasModel) {
    const modes = document.createElement('div');
    modes.className = 'viewer-modes';
    modes.setAttribute('aria-label', 'Chế độ xem xe');
    for (const [value, label] of [
      ['2d', 'Ảnh 2D'],
      ...(hasSequence ? [['360', '360° bằng ảnh']] : []),
      ...(hasModel ? [['3d', 'Mô hình 3D']] : []),
    ]) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.dataset.viewerModeButton = value;
      button.setAttribute('aria-pressed', String(value === mode));
      button.addEventListener('click', () => changeMode(value));
      modeButtons.push(button);
      modes.append(button);
    }
    stage.before(modes);
    const rotate = document.createElement('button');
    rotate.type = 'button';
    rotate.textContent = 'Tự xoay';
    rotate.dataset.viewerAuto = '';
    rotate.disabled = true;
    rotate.setAttribute('aria-pressed', 'false');
    rotate.addEventListener('click', () => {
      if (mode === '2d' || motion.matches) return;
      const active = rotate.getAttribute('aria-pressed') !== 'true';
      stopRotation();
      rotate.setAttribute('aria-pressed', String(active));
      if (active && mode === '3d') model.autoRotate = true;
      if (active && mode === '360')
        timer = setInterval(() => showFrame(frame + 1), 150);
    });
    controls.append(rotate);
  }

  function stopRotation() {
    clearInterval(timer);
    timer = null;
    if (model) model.autoRotate = false;
    controls
      .querySelector('[data-viewer-auto]')
      ?.setAttribute('aria-pressed', 'false');
  }
  function updateZoom(value) {
    zoom = Math.max(1, Math.min(3, value));
    if (mode === '3d' && model?.loaded) {
      const orbit = model.getCameraOrbit();
      model.cameraOrbit = `${orbit.theta}rad ${orbit.phi}rad ${100 / zoom}%`;
    } else
      (mode === '2d' ? stage : interactive).style.setProperty(
        '--viewer-zoom',
        zoom,
      );
    const image = interactive.querySelector('img');
    if (image) image.style.scale = zoom;
    status.textContent = `${mode === '3d' ? 'Góc nhìn 3D' : 'Ảnh'} · ${Math.round(zoom * 100)}%`;
    controls.querySelector('[data-viewer-zoom-out]').disabled = zoom === 1;
    controls.querySelector('[data-viewer-zoom-in]').disabled = zoom === 3;
  }
  function reset() {
    stopRotation();
    frame = 0;
    if (model) {
      model.cameraOrbit = '0deg 75deg 100%';
      model.cameraTarget = 'auto auto auto';
    }
    updateZoom(1);
    if (mode === '360') showFrame(0);
  }
  function fail(message) {
    changeMode('2d');
    status.textContent = message + ' Bạn vẫn có thể xem ảnh 2D.';
  }
  async function showFrame(index) {
    const frames = colors[selected].frames;
    frame = (index + frames.length) % frames.length;
    const ticket = ++request;
    const image = new Image();
    image.alt = `${config.name} — ${colors[selected].name} — góc ${frame + 1}/${frames.length}`;
    image.src = localURL(frames[frame]);
    try {
      await image.decode();
      // Bỏ kết quả tải cũ khi đổi màu hoặc kéo liên tục.
      if (ticket !== request || mode !== '360') return;
      image.style.scale = zoom;
      interactive.replaceChildren(image);
      status.textContent = `360° bằng ảnh · góc ${frame + 1}/${frames.length}`;
    } catch {
      if (ticket === request && mode === '360')
        fail('Không tải được ảnh góc xoay.');
    }
  }
  function applyMaterial() {
    if (!model?.loaded || !colors[selected]) return;
    const color = colors[selected];
    // Chỉ đổi vật liệu thân xe được khai báo, không tô lại kính/lốp/nội thất.
    if (color.variant) model.variantName = color.variant;
    else if (color.materialColor) {
      for (const material of model.model.materials) {
        if (config.model.bodyMaterials?.includes(material.name))
          material.pbrMetallicRoughness.setBaseColorFactor(color.materialColor);
      }
    }
  }
  async function changeMode(next) {
    const ticket = ++request;
    clearTimeout(loadTimer);
    stopRotation();
    mode = next;
    root.dataset.viewerMode = next;
    note.textContent =
      next === '2d'
        ? note2D
        : next === '360'
          ? '360° bằng ảnh: kéo ngang để đổi góc; đây không phải mô hình 3D.'
          : 'Mô hình 3D: kéo ngang/dọc để xoay, cuộn hoặc chụm hai ngón để thu phóng.';
    const auto = controls.querySelector('[data-viewer-auto]');
    if (auto) auto.disabled = next === '2d' || motion.matches;
    credit.hidden = next === '2d';
    if (next !== '2d') {
      const asset = next === '3d' ? config.model : colors[selected];
      const link = document.createElement('a');
      link.href = asset.source;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = `Nguồn ${next === '3d' ? 'mô hình 3D' : 'chuỗi ảnh 360°'}: ${asset.author || config.name} · ${asset.license || asset.framesLicense}`;
      credit.replaceChildren(link);
    }
    stage.hidden = next !== '2d';
    interactive.hidden = next === '2d';
    modeButtons.forEach((button) =>
      button.setAttribute(
        'aria-pressed',
        String(button.dataset.viewerModeButton === next),
      ),
    );
    reset();
    if (next !== '3d') {
      if (model) model.remove();
      return;
    }
    status.textContent = 'Đang tải mô hình 3D…';
    loadTimer = setTimeout(() => {
      if (mode === '3d') fail('Mô hình tải quá lâu. Vui lòng thử lại.');
    }, 20000);
    try {
      await loadModelViewer();
      if (ticket !== request || mode !== '3d') return;
      if (!model) {
        model = document.createElement('model-viewer');
        model.setAttribute('camera-controls', '');
        model.setAttribute('touch-action', 'pan-y');
        model.setAttribute('shadow-intensity', '1');
        model.setAttribute('environment-image', 'neutral');
        model.setAttribute('camera-orbit', '0deg 75deg 100%');
        if (motion.matches) model.setAttribute('interpolation-decay', '0');
        model.setAttribute('alt', `${config.name} — mô hình 3D`);
        model.setAttribute('poster', localURL(config.image));
        model.setAttribute('src', localURL(config.model.src));
        model.addEventListener('load', () => {
          clearTimeout(loadTimer);
          applyMaterial();
          if (mode === '3d')
            status.textContent =
              'Kéo để xoay; cuộn hoặc chụm hai ngón để thu phóng.';
        });
        model.addEventListener('error', () => {
          if (mode === '3d') fail('Không thể hiển thị 3D trên thiết bị này.');
        });
      }
      interactive.replaceChildren(model);
      applyMaterial();
      if (model.loaded) {
        clearTimeout(loadTimer);
        status.textContent =
          'Kéo để xoay; cuộn hoặc chụm hai ngón để thu phóng.';
      }
    } catch {
      if (ticket === request && mode === '3d')
        fail('Không tải được trình xem 3D.');
    }
  }
  controls
    .querySelector('[data-viewer-zoom-in]')
    .addEventListener('click', () => updateZoom(zoom + 0.25));
  controls
    .querySelector('[data-viewer-zoom-out]')
    .addEventListener('click', () => updateZoom(zoom - 0.25));
  controls
    .querySelector('[data-viewer-reset]')
    .addEventListener('click', reset);
  stage.addEventListener('keydown', (event) => {
    if (!['+', '=', '-', 'Home'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') reset();
    else updateZoom(zoom + (event.key === '-' ? -0.25 : 0.25));
  });
  // Giữ sự kiện màu và carousel sẵn có; theo dõi màu đã thực sự được chọn.
  if (swatches) {
    swatches.setAttribute('role', 'group');
    swatches.setAttribute('aria-label', `Chọn màu ${config.name}`);
    new MutationObserver(() => {
      const index = buttons.findIndex(
        (button) => button.getAttribute('aria-pressed') === 'true',
      );
      if (index < 0 || index === selected) return;
      selected = index;
      updateZoom(1);
      if (mode === '360') showFrame(frame);
      if (mode === '3d') applyMaterial();
    }).observe(swatches, {
      attributes: true,
      subtree: true,
      attributeFilter: ['aria-pressed'],
    });
    swatches.addEventListener('keydown', (event) => {
      const index = buttons.indexOf(document.activeElement);
      if (
        index < 0 ||
        !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)
      )
        return;
      event.preventDefault();
      const next =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? buttons.length - 1
            : (index + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) %
              buttons.length;
      buttons[next].focus();
      buttons[next].click();
    });
  }
  interactive.addEventListener('keydown', (event) => {
    if (
      mode === '2d' ||
      ![
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        '+',
        '=',
        '-',
        'Home',
      ].includes(event.key)
    )
      return;
    event.preventDefault();
    if (event.key === 'Home') return reset();
    if (['+', '=', '-'].includes(event.key))
      return updateZoom(zoom + (event.key === '-' ? -0.25 : 0.25));
    if (mode === '360') showFrame(frame + (event.key === 'ArrowLeft' ? -1 : 1));
    if (mode === '3d' && model?.loaded) {
      const orbit = model.getCameraOrbit();
      const horizontal =
        event.key === 'ArrowLeft' ? -0.2 : event.key === 'ArrowRight' ? 0.2 : 0;
      const vertical =
        event.key === 'ArrowUp' ? -0.1 : event.key === 'ArrowDown' ? 0.1 : 0;
      model.cameraOrbit = `${orbit.theta + horizontal}rad ${Math.max(0.1, Math.min(Math.PI - 0.1, orbit.phi + vertical))}rad ${orbit.radius}m`;
    }
  });
  let previousX = null;
  interactive.addEventListener('pointerdown', (event) => {
    if (mode !== '360') return;
    stopRotation();
    previousX = event.clientX;
    interactive.setPointerCapture(event.pointerId);
  });
  interactive.addEventListener('pointermove', (event) => {
    if (mode !== '360' || previousX === null) return;
    const delta = event.clientX - previousX;
    if (Math.abs(delta) >= 10) {
      previousX = event.clientX;
      showFrame(frame + (delta > 0 ? 1 : -1));
    }
  });
  for (const event of ['pointerup', 'pointercancel', 'lostpointercapture'])
    interactive.addEventListener(event, () => {
      previousX = null;
    });
  // 2D cuộn trang bình thường; chỉ Ctrl+cuộn khi chủ động xem ảnh lớn.
  for (const target of [stage, interactive]) {
    let pinchStart = 0,
      pinchZoom = 1;
    const distance = (touches) =>
      Math.hypot(
        touches[0].clientX - touches[1].clientX,
        touches[0].clientY - touches[1].clientY,
      );
    target.addEventListener(
      'touchstart',
      (event) => {
        if (mode === '3d' || event.touches.length !== 2) return;
        pinchStart = distance(event.touches);
        pinchZoom = zoom;
        previousX = null;
      },
      { passive: true },
    );
    target.addEventListener(
      'touchmove',
      (event) => {
        if (mode === '3d' || event.touches.length !== 2 || !pinchStart) return;
        event.preventDefault();
        event.stopPropagation();
        updateZoom((pinchZoom * distance(event.touches)) / pinchStart);
      },
      { passive: false },
    );
    target.addEventListener(
      'touchend',
      () => {
        pinchStart = 0;
      },
      { passive: true },
    );
    target.addEventListener(
      'wheel',
      (event) => {
        if (mode === '3d' || (!event.ctrlKey && mode === '2d')) return;
        event.preventDefault();
        updateZoom(zoom + (event.deltaY < 0 ? 0.15 : -0.15));
      },
      { passive: false },
    );
  }
  motion.addEventListener('change', () => {
    if (motion.matches) stopRotation();
    const auto = controls.querySelector('[data-viewer-auto]');
    if (auto) auto.disabled = mode === '2d' || motion.matches;
    if (model)
      model.setAttribute('interpolation-decay', motion.matches ? '0' : '50');
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopRotation();
  });
  stage.querySelectorAll('img').forEach((image) =>
    image.addEventListener('error', () => {
      status.textContent =
        'Ảnh này chưa tải được. Hãy chọn màu khác hoặc xem thư viện ảnh bên dưới.';
    }),
  );
  if (name) name.setAttribute('aria-live', 'polite');
  updateZoom(1);
}
