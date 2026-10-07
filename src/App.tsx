/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Shuffle, Search, Sun, Moon } from 'lucide-react';
import { 
  GARMENTS, 
  HEADWEAR, 
  FOOTWEAR, 
  JEWELRY, 
  HANDHELD, 
  GEN_Z_ACCESSORIES, 
  COLOR_PRESETS,
  SPECIAL_GARMENTS,
  type Garment,
  type Headwear,
  type Footwear,
  type ColorPreset
} from './data/costumeData';
import { CostumeModel } from './components/CostumeModel';
import { PieceInfoCard } from './components/PieceInfoCard';

export default function App() {
  // Navigation: 1 = Trang 1 (Phối đồ), 2 = Trang 2 (Cẩm nang thông tin)
  const [activePage, setActivePage] = useState<number>(1);

  // Model Gender: 'male' (Nam) | 'female' (Nữ)
  const [modelGender, setModelGender] = useState<'male' | 'female'>('female');

  // Slot 1: Garment selection (Trang phục phổ thông)
  const [selectedGarment, setSelectedGarment] = useState<Garment>(GARMENTS.find(g => g.id === 'nhat-binh') || GARMENTS[0]); // Default: Nhật Bình

  // Slot Đặc biệt: Trang phục đặc biệt cố định nguyên bản (null nếu mặc đồ thường)
  const [selectedSpecialId, setSelectedSpecialId] = useState<string | null>(null);

  // Slot 2: Color customization (3 hex colors: lining, dress, pants)
  const [selectedPreset, setSelectedPreset] = useState<ColorPreset>(COLOR_PRESETS[0]);
  const [liningColor, setLiningColor] = useState<string>(COLOR_PRESETS[0].lining);
  const [dressColor, setDressColor] = useState<string>(COLOR_PRESETS[0].dress);
  const [pantsColor, setPantsColor] = useState<string>(COLOR_PRESETS[0].pants);

  // Slot 3: Traditional accessories
  const [selectedHeadwear, setSelectedHeadwear] = useState<Headwear | null>(HEADWEAR.find(hw => hw.id === 'non-ba-tam') || null); // Default: Nón ba tầm
  const [selectedFootwear, setSelectedFootwear] = useState<Footwear>(FOOTWEAR[0]); // Default: Hài thêu
  const [selectedJewelry, setSelectedJewelry] = useState<string[]>(['kieng-co']); // Kiềng cổ
  const [selectedHandheld, setSelectedHandheld] = useState<string>('quat'); // Quạt

  // Slot 4: Gen Z modern accessories (5 items from PDF)
  const [selectedGenZ, setSelectedGenZ] = useState<string[]>(['kinh-ram', 'may-anh', 'sneaker']);

  // Builder Tab: 'garment' | 'color' | 'accessory' | 'genz'
  const [builderTab, setBuilderTab] = useState<'garment' | 'color' | 'accessory' | 'genz'>('garment');

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [darkBackground, setDarkBackground] = useState(true);
  const [focusedAccessoryId, setFocusedAccessoryId] = useState<string | null>('non-ba-tam');

  const garmentInfo = selectedSpecialId
    ? SPECIAL_GARMENTS.find(item => item.id === selectedSpecialId) : selectedGarment;
  const wornAccessories = [
    selectedHeadwear,
    selectedGenZ.includes('sneaker') ? null : selectedFootwear,
    ...JEWELRY.filter(item => selectedJewelry.includes(item.id) && (!item.allowedGender || item.allowedGender === modelGender)),
    HANDHELD.find(item => item.id === selectedHandheld),
  ].filter(item => item != null);
  const accessoryInfo = wornAccessories.find(item => item.id === focusedAccessoryId) || wornAccessories[0];

  // Update CSS Variables on root whenever colors or footwear changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--dress', dressColor);
    root.style.setProperty('--lining', liningColor);
    root.style.setProperty('--pants', pantsColor);

    // Compute subtle tone variations for dress back and dress edge
    if (selectedPreset.dress === dressColor) {
      root.style.setProperty('--dress-back', selectedPreset.dressBack || '#E2A00E');
      root.style.setProperty('--dress-edge', selectedPreset.dressEdge || liningColor);
    } else {
      root.style.setProperty('--dress-back', dressColor);
      root.style.setProperty('--dress-edge', liningColor);
    }

    // Footwear styling
    root.style.setProperty('--shoe', selectedFootwear.shoeColor);
    root.style.setProperty('--sole', selectedFootwear.soleColor);
  }, [dressColor, liningColor, pantsColor, selectedFootwear, selectedPreset]);

  // Apply a color preset
  const handleApplyPreset = (preset: ColorPreset) => {
    setSelectedSpecialId(null);
    setSelectedPreset(preset);
    setLiningColor(preset.lining);
    setDressColor(preset.dress);
    setPantsColor(preset.pants);
  };

  // Select garment and apply its characteristic look
  const handleSelectGarment = (g: Garment) => {
    setSelectedSpecialId(null);
    setSelectedGarment(g);
  };

  // Select special garment (toggles on/off - chỉ hiện hoặc không hiện)
  const handleSelectSpecial = (id: string) => {
    setSelectedSpecialId(prev => (prev === id ? null : id));
    setSelectedFootwear(FOOTWEAR[0]);
  };

  // Toggle jewelry
  const handleToggleJewelry = (id: string) => {
    setSelectedSpecialId(null);
    setFocusedAccessoryId(id);
    setSelectedJewelry(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Toggle Gen Z item
  const handleToggleGenZ = (id: string) => {
    setSelectedGenZ(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Randomize look
  const handleRandomRemix = () => {
    const choose = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];
    const validGarments = GARMENTS.filter(g => modelGender === 'female' || g.id !== 'nhat-binh');
    const validSpecials = SPECIAL_GARMENTS.filter(g => g.gender === (modelGender === 'female' ? 'Nữ' : 'Nam'));
    const outfitId = choose([...validGarments.map(g => g.id), ...validSpecials.map(g => g.id)]);
    const randomGarment = validGarments.find(g => g.id === outfitId);
    const specialId = randomGarment ? null : outfitId;
    const randomPreset = choose(COLOR_PRESETS);
    const validHeadwear = HEADWEAR.filter(hw => !hw.allowedGender || hw.allowedGender === modelGender);
    const randomHead = specialId ? null : choose([null, ...validHeadwear]);
    const randomHand = specialId ? 'none' : choose(['none', ...HANDHELD.map(item => item.id)]);
    const randomJewelry = specialId ? [] : JEWELRY.filter(item =>
      (!item.allowedGender || item.allowedGender === modelGender) && Math.random() < 0.5).map(item => item.id);
    const validFootwear = specialId ? FOOTWEAR.filter(item => ['hai-theu', 'sneaker'].includes(item.id)) : FOOTWEAR;
    const randomFoot = choose(validFootwear);
    const randomGenZ = GEN_Z_ACCESSORIES.filter(item => item.id !== 'sneaker' && Math.random() < 0.5).map(item => item.id);
    if (randomFoot.id === 'sneaker') randomGenZ.push('sneaker');

    setSelectedSpecialId(specialId);
    setSelectedGarment(randomGarment || validGarments[0]);
    setSelectedPreset(randomPreset);
    setLiningColor(randomPreset.lining);
    setDressColor(randomPreset.dress);
    setPantsColor(randomPreset.pants);
    setSelectedHeadwear(randomHead);
    setSelectedHandheld(randomHand);
    setSelectedJewelry(randomJewelry);
    setSelectedFootwear(randomFoot.id === 'sneaker' ? FOOTWEAR[0] : randomFoot);
    setSelectedGenZ(randomGenZ);
    setFocusedAccessoryId(null);
  };

  // Keydown for Esc to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxOpen) {
        setLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  // Toggle gender
  const handleToggleGender = () => {
    const nextGender = modelGender === 'male' ? 'female' : 'male';
    setSelectedJewelry(prev => prev.filter(id => {
      const item = JEWELRY.find(jw => jw.id === id);
      return !item?.allowedGender || item.allowedGender === nextGender;
    }));
    setSelectedHeadwear(prev => prev?.allowedGender && prev.allowedGender !== nextGender
      ? HEADWEAR.find(hw => hw.id === (nextGender === 'female' ? 'khan-dong' : 'khan-xep')) || null : prev);
    setModelGender(prev => {
      const nextGender = prev === 'male' ? 'female' : 'male';
      // Nếu đang mặc trang phục đặc biệt, chuyển sang trang phục đặc biệt tương ứng của giới tính mới
      if (selectedSpecialId) {
        if (nextGender === 'female') {
          if (selectedSpecialId === 'special-long-bao-nam') setSelectedSpecialId('special-phuong-bao-nu');
          else if (selectedSpecialId === 'special-quan-phuc-nam') setSelectedSpecialId('special-bach-y-nu');
          else setSelectedSpecialId('special-phuong-bao-nu');
        } else {
          if (selectedSpecialId === 'special-phuong-bao-nu') setSelectedSpecialId('special-long-bao-nam');
          else if (selectedSpecialId === 'special-bach-y-nu') setSelectedSpecialId('special-quan-phuc-nam');
          else setSelectedSpecialId('special-long-bao-nam');
        }
      } else {
        if (nextGender === 'male' && selectedGarment.id === 'nhat-binh') {
          const fallback = GARMENTS.find(g => g.id === 'ngu-than-tay-chen') || GARMENTS[0];
          setSelectedGarment(fallback);
        }
      }
      return nextGender;
    });
  };

  // One original-vector renderer for the stage and the enlarged view.
  const renderCharacterSVG = (isLightbox = false) => (
    <CostumeModel
      gender={modelGender}
      garmentId={selectedGarment.id}
      garmentName={selectedGarment.name}
      specialId={selectedSpecialId}
      isLightbox={isLightbox}
      headwearId={selectedHeadwear?.id}
      handheldId={selectedHandheld}
      jewelry={selectedJewelry}
      genZ={selectedGenZ}
      footwearId={selectedGenZ.includes('sneaker') ? 'sneaker' : selectedSpecialId ? FOOTWEAR[0].id : selectedFootwear.id}
    />
  );

  const renderBackgroundToggle = () => (
    <button
      type="button"
      className="background-toggle"
      aria-pressed={darkBackground}
      aria-label={darkBackground ? 'Chuyển sang nền sáng' : 'Chuyển sang nền tối'}
      title={darkBackground ? 'Chuyển sang nền sáng' : 'Chuyển sang nền tối'}
      onClick={() => setDarkBackground(prev => !prev)}
    >
      {darkBackground ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
    </button>
  );

  const renderGenderToggle = (inline = false) => (
    <button
      type="button"
      className={`gender-toggle${inline ? ' gender-toggle-inline' : ''}`}
      aria-label={modelGender === 'male' ? 'Đang chọn nam (M). Bấm để chuyển sang nữ (F)' : 'Đang chọn nữ (F). Bấm để chuyển sang nam (M)'}
      title={modelGender === 'male' ? 'Chuyển sang nữ (F)' : 'Chuyển sang nam (M)'}
      onClick={handleToggleGender}
    >
      {modelGender === 'male' ? 'M' : 'F'}
    </button>
  );

  return (
    <div className="flex flex-col h-full w-full min-h-0 overflow-hidden">
      {/* Top Header */}
      <header className="topbar">
        <div className="brand">
          <span className="text-amber-600">✦</span>
          <span>Việt Phục Remix</span>
        </div>
        <nav className="tabs" role="tablist">
          <button 
            role="tab" 
            className={activePage === 1 ? 'active' : ''} 
            aria-selected={activePage === 1}
            onClick={() => setActivePage(1)}
          >
            Trang 1
          </button>
          <button 
            role="tab" 
            className={activePage === 2 ? 'active' : ''} 
            aria-selected={activePage === 2}
            onClick={() => setActivePage(2)}
          >
            Trang 2
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main>
        {/* ===== TRANG 1: PHỐI ĐỒ & BẢNG ĐIỀU KHIỂN ===== */}
        <section className={`page ${activePage === 1 ? 'active' : ''}`}>
          <div className="split">
            
            {/* Trái: Nhân vật */}
            <div className="card stage-col">
              <div className={`stage ${darkBackground ? 'preview-dark' : ''}`}>
                {renderBackgroundToggle()}
                {renderGenderToggle()}

                {renderCharacterSVG(false)}
              </div>
              <div className="grid grid-cols-2 gap-3 shrink-0 pt-1">
                <button 
                  type="button"
                  className="builder-btn flex items-center justify-center gap-2 py-2.5 px-4 font-medium text-[13px] text-slate-700 hover:border-slate-400 bg-white" 
                  onClick={handleRandomRemix}
                  title="Ngẫu nhiên"
                >
                  <Shuffle className="w-4 h-4 text-slate-700 shrink-0" strokeWidth={2} />
                  <span>Ngẫu nhiên</span>
                </button>
                <button 
                  type="button"
                  className="builder-btn flex items-center justify-center py-2.5 px-4 text-slate-700 hover:border-slate-400 bg-white" 
                  onClick={() => setLightboxOpen(true)}
                  title="Phóng to"
                  aria-label="Phóng to"
                >
                  <Search className="w-4 h-4 text-slate-700 shrink-0" strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Phải: Khung chứa Tab Menu và Vùng nội dung theo ảnh mẫu */}
            <div className="builder-panel">
              {/* Thanh điều hướng (Tab Menu) dạng khối liền kề */}
              <div className="tab-menu-nav">
                <button
                  type="button"
                  className={`tab-menu-btn ${builderTab === 'garment' ? 'active' : ''}`}
                  onClick={() => setBuilderTab('garment')}
                >
                  Trang phục
                </button>
                <button
                  type="button"
                  className={`tab-menu-btn ${builderTab === 'color' ? 'active' : ''}`}
                  onClick={() => setBuilderTab('color')}
                >
                  Màu sắc
                </button>
                <button
                  type="button"
                  className={`tab-menu-btn ${builderTab === 'accessory' ? 'active' : ''}`}
                  onClick={() => setBuilderTab('accessory')}
                >
                  Phụ kiện
                </button>
                <button
                  type="button"
                  className={`tab-menu-btn ${builderTab === 'genz' ? 'active' : ''}`}
                  onClick={() => setBuilderTab('genz')}
                >
                  Gen Z
                </button>
              </div>

              {/* Vùng nội dung (Body): Trải dọc phía dưới, chia thành các phân nhóm thuộc tính */}
              <div className="tab-body-scroll">
                
                {/* 1. TAB TRANG PHỤC */}
                {builderTab === 'garment' && (
                  <div>
                    {/* Phân nhóm 1: Kiểu áo ngoài phổ thông */}
                    <div className="sub-section">
                      <h3 className="sub-section-title">Kiểu áo ngoài</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {GARMENTS
                          .filter(g => modelGender === 'female' || g.id !== 'nhat-binh')
                          .map((g) => {
                            const isSelected = selectedSpecialId === null && selectedGarment.id === g.id;
                            return (
                              <button
                                key={g.id}
                                type="button"
                                onClick={() => handleSelectGarment(g)}
                                className={`builder-btn ${isSelected ? 'active' : ''}`}
                              >
                                {g.name}
                              </button>
                            );
                          })}
                      </div>
                    </div>

                    {/* Phân nhóm 2: Trang phục Đặc biệt (Được đẩy xuống để không sát hàng trên, nút đơn giản) */}
                    <div className="sub-section mt-7">
                      <h3 className="sub-section-title">Đặc biệt</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {SPECIAL_GARMENTS
                          .filter(sg => (modelGender === 'male' ? sg.gender === 'Nam' : sg.gender === 'Nữ'))
                          .map((sg) => {
                            const isSelected = selectedSpecialId === sg.id;
                            return (
                              <button
                                key={sg.id}
                                type="button"
                                onClick={() => handleSelectSpecial(sg.id)}
                                className={`builder-btn ${isSelected ? 'active' : ''}`}
                              >
                                {sg.name}
                              </button>
                            );
                          })}
                      </div>
                    </div>
                    <PieceInfoCard item={garmentInfo} />
                  </div>
                )}

                {/* 2. TAB MÀU SẮC */}
                {builderTab === 'color' && !selectedSpecialId && (
                  <div className="sub-section">
                    <h3 className="sub-section-title">Phong cách phối màu (Lót trong · Áo ngoài · Quần)</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {COLOR_PRESETS.map((preset) => {
                        const isSelected = selectedPreset.id === preset.id;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => handleApplyPreset(preset)}
                            className={`builder-btn flex flex-col items-center gap-2 p-3 ${isSelected ? 'active' : ''}`}
                          >
                            {/* Dải 3 màu trực quan như ô màu tóc trong ảnh mẫu */}
                            <div className="w-full h-8 rounded-lg flex overflow-hidden border border-black/10 shrink-0">
                              <span 
                                className="flex-1 h-full" 
                                style={{ backgroundColor: preset.lining }} 
                                title={`Lót trong: ${preset.lining}`} 
                              />
                              <span 
                                className="flex-1 h-full" 
                                style={{ backgroundColor: preset.dress }} 
                                title={`Áo ngoài: ${preset.dress}`} 
                              />
                              <span 
                                className="flex-1 h-full" 
                                style={{ backgroundColor: preset.pants }} 
                                title={`Quần/váy: ${preset.pants}`} 
                              />
                            </div>
                            <span className="text-[13px] leading-snug w-full text-center">
                              {preset.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. TAB PHỤ KIỆN */}
                {builderTab === 'accessory' && !selectedSpecialId && (
                  <div className="space-y-6">
                    {/* Phân nhóm 1: Đồ đội đầu */}
                    <div className="sub-section">
                      <h3 className="sub-section-title">Đồ đội đầu</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {HEADWEAR.filter(hw => !hw.allowedGender || hw.allowedGender === modelGender).map((hw) => {
                          const isSelected = selectedHeadwear?.id === hw.id;
                          return (
                            <button
                              key={hw.id}
                              type="button"
                              onClick={() => {
                                setSelectedSpecialId(null);
                                setSelectedHeadwear(prev => prev?.id === hw.id ? null : hw);
                                setFocusedAccessoryId(hw.id);
                              }}
                              aria-pressed={isSelected}
                              className={`builder-btn ${isSelected ? 'active' : ''}`}
                            >
                              {hw.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Phân nhóm 2: Giày dép */}
                    <div className="sub-section">
                      <h3 className="sub-section-title">Giày dép</h3>
                      <div className="grid grid-cols-2 gap-2.5">
                        {FOOTWEAR.filter(fw => fw.id !== 'sneaker').map((fw) => {
                          const isSelected = selectedFootwear.id === fw.id && !selectedGenZ.includes('sneaker');
                          return (
                            <button
                              key={fw.id}
                              type="button"
                              onClick={() => {
                                setSelectedFootwear(fw);
                                setFocusedAccessoryId(fw.id);
                                setSelectedGenZ(prev => prev.filter(id => id !== 'sneaker'));
                              }}
                              className={`builder-btn ${isSelected ? 'active' : ''}`}
                            >
                              {fw.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Phân nhóm 3: Trang sức */}
                    <div className="sub-section">
                      <h3 className="sub-section-title">Trang sức</h3>
                      <div className="grid grid-cols-2 gap-2.5">
                        {JEWELRY.filter(jw => !jw.allowedGender || jw.allowedGender === modelGender).map((jw) => {
                          const isChecked = selectedJewelry.includes(jw.id);
                          return (
                            <button
                              key={jw.id}
                              type="button"
                              onClick={() => handleToggleJewelry(jw.id)}
                              className={`builder-btn ${isChecked ? 'active' : ''}`}
                            >
                              {jw.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Phân nhóm 4: Đồ cầm tay */}
                    <div className="sub-section">
                      <h3 className="sub-section-title">Đồ cầm tay</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {HANDHELD.map((hh) => {
                          const isSelected = selectedHandheld === hh.id;
                          return (
                            <button
                              key={hh.id}
                              type="button"
                              onClick={() => {
                                setSelectedSpecialId(null);
                                setSelectedHandheld(prev => prev === hh.id ? 'none' : hh.id);
                                setFocusedAccessoryId(hh.id);
                              }}
                              aria-pressed={isSelected}
                              className={`builder-btn ${isSelected ? 'active' : ''}`}
                            >
                              {hh.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <PieceInfoCard item={accessoryInfo} />
                  </div>
                )}

                {/* 4. TAB PHONG CÁCH GEN Z */}
                {builderTab === 'genz' && (
                  <div className="sub-section">
                    <h3 className="sub-section-title">Phụ kiện hiện đại Gen Z</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {GEN_Z_ACCESSORIES.map((item) => {
                        const isChecked = selectedGenZ.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleToggleGenZ(item.id)}
                            className={`builder-btn ${isChecked ? 'active' : ''}`}
                          >
                            {item.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </section>

        {/* ===== TRANG 2: ĐỂ TRỐNG ===== */}
        <section className={`page ${activePage === 2 ? 'active' : ''}`}>
          <div className="card h-full min-h-0 flex items-center justify-center p-8 text-slate-400">
            {/* Để trống cho người dùng thêm nội dung sau */}
          </div>
        </section>
      </main>

      {/* Lightbox Zoom */}
      {lightboxOpen && (
        <div 
          className={`lightbox ${darkBackground ? 'preview-dark' : ''}`}
          role="dialog" 
          aria-modal="true" 
          aria-label="Phóng to ảnh"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxOpen(false);
          }}
        >
          {renderBackgroundToggle()}
          {/* Nút chuyển giới tính và nút đóng trong Lightbox */}
          <div className="absolute top-3.5 right-4 z-60 flex items-center gap-3">
            {renderGenderToggle(true)}
            <button className="btn lb-close !static shadow-md" onClick={() => setLightboxOpen(false)}>
              Đóng (Esc)
            </button>
          </div>
          <div className="lb-body">
            {renderCharacterSVG(true)}
          </div>
        </div>
      )}
    </div>
  );
}
