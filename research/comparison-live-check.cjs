const fs=require('node:fs');
(async()=>{
 const paths=['index.html','js/swipe.js','pages/vf3.html','pages/vf5.html','pages/viper.html','pages/product.html?id=kinet'];
 const results=[];
 for(const path of paths){const url='https://datapcode19.github.io/vinf/'+path;try{const r=await fetch(url,{signal:AbortSignal.timeout(20000)});results.push({url,status:r.status});}catch(e){results.push({url,error:e.message});}}
 fs.writeFileSync('research/comparison/live-paths-final.json',JSON.stringify({checkedOn:'2026-11-09',results},null,2));console.log(results);
})();
