import {localURL} from './routes.js';
const models=[['vf3','VF 3'],['vf6','VF 6'],['vf7','VF 7'],['minio','Minio Green'],['ecvan','EC Van'],['limo','Limo Green']];
export function addMaintenanceChart(main){
 const section=main.querySelector('#maintenance-schedule');
 section.querySelector('.muted').remove();
 section.insertAdjacentHTML('beforeend',`<div class="maintenance-chart"><label for="schedule-model">Lịch bảo dưỡng theo mẫu xe</label><select id="schedule-model">${models.map(([id,name])=>`<option value="${id}">${name}</option>`).join('')}</select><p id="schedule-title" role="status">Lịch bảo dưỡng VF 3</p><div class="chart-scroll" tabindex="0" aria-label="Bảng lịch bảo dưỡng, cuộn ngang để đọc"><img id="schedule-image" src="${localURL('assets/maintenance/vf3.png')}" alt="Bảng lịch bảo dưỡng VF 3 từ trang nguồn" loading="lazy"></div><a id="schedule-original" class="text-link" href="${localURL('assets/maintenance/vf3.png')}" target="_blank" rel="noopener">Mở ảnh bảng đầy đủ</a><p class="muted">Ảnh bảng gốc dành cho sáu mẫu đã xác minh; cuộn ngang trên màn hình nhỏ. Các mẫu khác chưa có bảng trong bản dựng.</p></div>`);
 section.querySelector('select').addEventListener('change',event=>{const [id,name]=models.find(([id])=>id===event.target.value);const image=section.querySelector('#schedule-image');image.src=localURL('assets/maintenance/'+id+'.png');image.alt='Bảng lịch bảo dưỡng '+name+' từ trang nguồn';section.querySelector('#schedule-original').href=image.src;section.querySelector('#schedule-title').textContent='Lịch bảo dưỡng '+name;});
}
