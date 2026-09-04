const mountKnownPreview = () => {
  document.querySelectorAll<HTMLElement>('.detail-panel').forEach((panel) => {
    if (panel.querySelector('[data-known-preview]')) return;
    const title = [...panel.querySelectorAll('h2')].find((h) => h.textContent?.trim() === 'Known.');
    if (!title?.parentElement) return;
    const box = document.createElement('div');
    box.dataset.knownPreview = 'true';
    box.style.cssText = 'width:min(100%,330px);height:178px;margin:0 0 28px;border:1px solid rgba(255,255,255,.15);background:#101116;overflow:hidden;color:#e8e7dc;font-family:inherit;';
    box.innerHTML = '<div style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.1);font:8px ui-monospace,monospace;letter-spacing:.15em;text-transform:uppercase;color:#8f918c">known / product preview <span style="float:right;color:#d5ff65">● live</span></div><div data-stage style="height:130px;padding:10px;box-sizing:border-box"></div><div data-bars style="display:flex;gap:3px;padding:5px 10px;border-top:1px solid rgba(255,255,255,.1)"></div>';
    const stage = box.querySelector<HTMLElement>('[data-stage]')!;
    const bars = box.querySelector<HTMLElement>('[data-bars]')!;
    const frames = [
      ['inbox','Maya Rivera','Question about my order','Customer found'],
      ['conversation','Maya Rivera','Order #1048 arrived with the wrong size.','2 memories surfaced'],
      ['customer context','Maya Rivera','Returning customer · 4 orders','Preference: medium'],
      ['AI response','Draft ready','I found Maya’s previous order and size preference.','Memory used'],
    ];
    let i = 0;
    const render = () => {
      const [label,name,body,memory] = frames[i];
      stage.style.opacity = '0'; stage.style.transform = 'translateY(4px)';
      stage.innerHTML = '<div style="display:grid;grid-template-columns:55px 1fr;gap:7px;height:100%"><div style="border:1px solid rgba(255,255,255,.1);padding:6px"><div style="height:3px;width:22px;background:#ffffff22;margin-bottom:8px"></div>'+frames.map((_,n)=>'<div style="height:16px;margin-bottom:5px;border:1px solid '+(n===i?'#d5ff6566':'#ffffff0d')+';background:'+(n===i?'#d5ff6514':'#ffffff03')+'"></div>').join('')+'</div><div style="border:1px solid rgba(255,255,255,.1);padding:8px"><div style="display:flex;justify-content:space-between;font:6px ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase"><span style="color:#d5ff65">'+label+'</span><span style="color:#ffffff40">0'+(i+1)+' / 04</span></div><div style="display:flex;gap:7px;margin-top:10px"><div style="width:22px;height:22px;border-radius:50%;background:#ffffff08;border:1px solid #ffffff18"></div><div><div style="font-size:9px">'+name+'</div><div style="margin-top:3px;font-size:7px;line-height:1.35;color:#8f918c">'+body+'</div></div></div><div style="margin-top:9px;padding-top:6px;border-top:1px solid #ffffff12;font:6px ui-monospace,monospace;color:#d5ff65">'+memory+'<div style="height:4px;margin-top:5px;background:#ffffff0a"><div style="height:100%;width:'+(35+i*20)+'%;background:#d5ff6580;transition:width .6s"></div></div></div></div></div>';
      bars.innerHTML = frames.map((_,n)=>'<span style="height:1px;flex:1;background:'+(n===i?'#d5ff65':'#ffffff12')+'"></span>').join('');
      requestAnimationFrame(() => { stage.style.transition = 'opacity .35s,transform .35s'; stage.style.opacity='1'; stage.style.transform='none'; });
    };
    render();
    const timer = window.setInterval(() => { i=(i+1)%frames.length; render(); },1750);
    box.dataset.timer = String(timer);
    title.parentElement.insertBefore(box,title);
  });
};

if (typeof document !== 'undefined') {
  new MutationObserver(mountKnownPreview).observe(document.documentElement,{childList:true,subtree:true});
  window.setTimeout(mountKnownPreview,0);
}
