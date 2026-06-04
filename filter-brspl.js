// BRSPL city filter — temporary client-side fix v55
// Filters out workers from non-BRSPL cities to remove duplicates/wrong cluster MEI
(function(){
  const BRSPL_CITIES_CODES = ['PG','GR','KG','IB','UB','MN','BR','IT','PE'];
  const BRSPL_CITIES_NAMES = [
    'Praia Grande','Guaruja','Guarujá','Caraguatatuba','Ilhabela','Ubatuba',
    'Mongaguá','Mongagua','Bertioga','Itanhaem','Itanhaém','Peruíbe','Peruibe'
  ];
  // Caraguatatuba — оставляем условно (KG), Santo André и Sao Paulo — НЕ BRSPL
  const NON_BRSPL_CITIES = ['Sao Paulo','São Paulo','Santo André','Santo Andre',
    'Sorocaba','Campinas','Campos do Jordão','Campos do Jordao',
    'Sao Jose dos Campos','São José dos Campos'];
  
  function isBRSPL(cidade){
    if(!cidade) return false;
    const c = String(cidade).trim();
    if(BRSPL_CITIES_CODES.includes(c)) return true;
    if(NON_BRSPL_CITIES.some(n => c.toLowerCase().includes(n.toLowerCase()))) return false;
    if(BRSPL_CITIES_NAMES.some(n => c.toLowerCase().includes(n.toLowerCase()))) return true;
    return false;
  }
  
  // Hook fetchBotData to filter workers right after they load
  const _origFetch = window.fetchBotData;
  if(typeof _origFetch === 'function'){
    window.fetchBotData = async function(){
      const result = await _origFetch.apply(this, arguments);
      try {
        if(window.WORKERS_RAW && Array.isArray(window.WORKERS_RAW)){
          const before = window.WORKERS_RAW.length;
          window.WORKERS_RAW = window.WORKERS_RAW.filter(w => isBRSPL(w.cidade));
          console.log('[BRSPL filter] workers:', before, '→', window.WORKERS_RAW.length);
        }
      } catch(e) { console.warn('[BRSPL filter] error', e); }
      return result;
    };
  }
  
  console.log('[BRSPL filter v55] installed');
})();