import type { UnlockKind } from './types';

// Old Page 2 item keys -> teammate's current wardrobe registry.
// Built-in miện/đai belong to the complete ceremonial model, not new standalone items.
export function migrateReward(kind:UnlockKind,id:string):{kind:UnlockKind;id:string}{
  const aliases:Record<string,{kind:UnlockKind;id:string}>={
    giao_linh_thien_thanh:{kind:'costumes',id:'giao-linh'},
    giao_linh_thien_thanh_bun:{kind:'costumes',id:'giao-linh'},
    le_phuc_ngu_sac:{kind:'colors',id:'thanh-da-luu-ly'},
    le_phuc_ngu_sac_hat:{kind:'colors',id:'thanh-da-luu-ly'},
    hoang_bao_long_trieu:{kind:'costumes',id:'special-long-bao-nam'},
    con_phuc_nam_giao:{kind:'costumes',id:'special-quan-phuc-nam'},
    khan_vanh_day:{kind:'headwear',id:'khan-vanh-day'},
    mien_quan:{kind:'costumes',id:'special-quan-phuc-nam'},
    dai_doi:{kind:'costumes',id:'special-quan-phuc-nam'},
    hoang_trieu:{kind:'colors',id:'kim-sa-hoang-toc'},
  };
  return aliases[id]??{kind,id};
}
