/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Shuffle, Search } from 'lucide-react';
import { 
  GARMENTS, 
  HEADWEAR, 
  FOOTWEAR, 
  JEWELRY, 
  HANDHELD, 
  GEN_Z_ACCESSORIES, 
  type Garment,
  type Headwear,
  type Footwear,
} from './data/costumeData';
import { 
  MaleGiaoLinh, 
  MaleVienLinh, 
  MaleConPhuc, 
  MaleAoTac, 
  MaleNguThan 
} from './components/MaleCostumes';
import { 
  FemaleNhatBinh, 
  FemaleAoTac, 
  FemaleNguThan, 
  FemaleGiaoLinh, 
  FemaleVienLinh, 
  FemaleConPhuc 
} from './components/FemaleCostumes';
import { MaleAccessories } from './components/MaleAccessories';
import { FemaleAccessories } from './components/FemaleAccessories';

export default function App() {
  // Navigation: 1 = Trang 1 (Phối đồ), 2 = Trang 2 (Cẩm nang thông tin)
  const [activePage, setActivePage] = useState<number>(1);

  // Model Gender: 'male' (Nam) | 'female' (Nữ)
  const [modelGender, setModelGender] = useState<'male' | 'female'>('male');

  // Slot 1: Garment selection (Chỉ giữ nguyên tag)
  const [selectedGarment, setSelectedGarment] = useState<Garment>(GARMENTS[3]); // Default: Giao lĩnh

  // Slot 3: Traditional accessories
  const [selectedHeadwear, setSelectedHeadwear] = useState<Headwear | null>(null); // Khởi đầu sạch sẽ
  const [selectedFootwear, setSelectedFootwear] = useState<Footwear>(FOOTWEAR[0]); // Hài thêu mặc định
  const [selectedJewelry, setSelectedJewelry] = useState<string[]>([]); // Không đeo trang sức mặc định
  const [selectedHandheld, setSelectedHandheld] = useState<string>(''); // Không cầm vật dụng mặc định

  // Slot 4: Gen Z modern accessories (5 items from PDF)
  const [selectedGenZ, setSelectedGenZ] = useState<string[]>([]); // Không đeo phụ kiện Gen Z mặc định

  // Builder Tab: 'accessory' | 'genz' | 'garment'
  const [builderTab, setBuilderTab] = useState<'accessory' | 'genz' | 'garment'>('accessory');

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  // Update CSS Variables on root whenever footwear changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--shoe', selectedFootwear.shoeColor);
    root.style.setProperty('--sole', selectedFootwear.soleColor);
  }, [selectedFootwear]);

  // Select garment tag
  const handleSelectGarment = (g: Garment) => {
    setSelectedGarment(g);
  };

  // Toggle jewelry
  const handleToggleJewelry = (id: string) => {
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
    const validGarments = GARMENTS.filter(g => modelGender === 'female' ? g.gender !== 'Nam' : g.gender !== 'Nữ');
    const randomGarment = validGarments[Math.floor(Math.random() * validGarments.length)];
    const validHead = HEADWEAR.filter(hw => hw.gender.includes('Nam & Nữ') || (modelGender === 'female' ? !hw.gender.startsWith('Nam') : !hw.gender.startsWith('Nữ')));
    const randomHead = Math.random() > 0.3 ? validHead[Math.floor(Math.random() * validHead.length)] : null;
    const randomFoot = FOOTWEAR[Math.floor(Math.random() * FOOTWEAR.length)];
    const randomGenZ = GEN_Z_ACCESSORIES.filter(() => Math.random() > 0.6).map(i => i.id);

    setSelectedGarment(randomGarment);
    setSelectedHeadwear(randomHead);
    setSelectedFootwear(randomFoot);
    setSelectedGenZ(randomGenZ);
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
    setModelGender(prev => {
      const nextGender = prev === 'male' ? 'female' : 'male';
      if (nextGender === 'male' && selectedGarment.gender === 'Nữ') {
        const fallback = GARMENTS.find(g => g.id === 'giao-linh') || GARMENTS[0];
        setSelectedGarment(fallback);
      } else if (nextGender === 'female' && selectedGarment.gender === 'Nam') {
        const fallback = GARMENTS.find(g => g.id === 'nhat-binh') || GARMENTS[0];
        setSelectedGarment(fallback);
      }
      return nextGender;
    });
  };

  // Render Female Model wearing Traditional Costumes
  const renderFemaleCostume = () => {
    const acc = (
      <FemaleAccessories 
        headwearId={selectedHeadwear?.id}
        jewelryIds={selectedJewelry}
        genZIds={selectedGenZ}
        handheldId={selectedHandheld}
      />
    );

    switch (selectedGarment.id) {
      case 'nhat-binh':
        return <FemaleNhatBinh>{acc}</FemaleNhatBinh>;
      case 'ao-tac':
        return <FemaleAoTac>{acc}</FemaleAoTac>;
      case 'ngu-than-tay-chen':
        return <FemaleNguThan>{acc}</FemaleNguThan>;
      case 'giao-linh':
        return <FemaleGiaoLinh>{acc}</FemaleGiaoLinh>;
      case 'vien-linh':
        return <FemaleVienLinh>{acc}</FemaleVienLinh>;
      case 'con-phuc':
      default:
        return <FemaleConPhuc>{acc}</FemaleConPhuc>;
    }
  };

  const renderFemaleModelSVG = (isLightbox: boolean = false) => (
    <div className="model model-female flex items-center justify-center w-full h-full max-h-[520px]" id={isLightbox ? "lb-model" : "stage-model"}>
      {renderFemaleCostume()}
    </div>
  );

  // Render Male Model wearing Traditional Costumes
  const renderMaleCostume = () => {
    const acc = (
      <MaleAccessories 
        headwearId={selectedHeadwear?.id}
        jewelryIds={selectedJewelry}
        genZIds={selectedGenZ}
        handheldId={selectedHandheld}
      />
    );

    switch (selectedGarment.id) {
      case 'giao-linh':
        return <MaleGiaoLinh>{acc}</MaleGiaoLinh>;
      case 'vien-linh':
        return <MaleVienLinh>{acc}</MaleVienLinh>;
      case 'con-phuc':
        return <MaleConPhuc>{acc}</MaleConPhuc>;
      case 'ao-tac':
        return <MaleAoTac>{acc}</MaleAoTac>;
      case 'ngu-than-tay-chen':
        return <MaleNguThan>{acc}</MaleNguThan>;
      case 'nhat-binh':
      default:
        return <MaleAoTac>{acc}</MaleAoTac>;
    }
  };

  // Render SVG Character component
  const renderCharacterSVG = (isLightbox: boolean = false) => {
    if (modelGender === 'female') {
      return renderFemaleModelSVG(isLightbox);
    }

    return (
      <div className="model flex items-center justify-center w-full h-full max-h-[520px]" id={isLightbox ? "lb-model" : "stage-model"}>
        {renderMaleCostume()}
      </div>
    );
  };


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
              <div className="stage">
                {/* Nút gạt chuyển đổi model M / F ở góc trình chiếu */}
                <div className="model-switch-container">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={modelGender === 'female'}
                    aria-label="Chuyển đổi người mẫu Nam (M) và Nữ (F)"
                    onClick={handleToggleGender}
                    className={`model-switch-toggle ${modelGender === 'female' ? 'active-female' : ''}`}
                    title={modelGender === 'male' ? 'Đang chọn mẫu Nam (M) - Gạt để chuyển sang mẫu Nữ (F)' : 'Đang chọn mẫu Nữ (F) - Gạt để chuyển sang mẫu Nam (M)'}
                  >
                    <span className="model-switch-thumb">
                      {modelGender === 'male' ? 'M' : 'F'}
                    </span>
                  </button>
                </div>

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
                <button
                  type="button"
                  className={`tab-menu-btn ${builderTab === 'garment' ? 'active' : ''}`}
                  onClick={() => setBuilderTab('garment')}
                >
                  Tag Trang phục
                </button>
              </div>

              {/* Vùng nội dung (Body): Trải dọc phía dưới, chia thành các phân nhóm thuộc tính */}
              <div className="tab-body-scroll">
                
                {/* 1. TAB TRANG PHỤC (Chỉ giữ nguyên tag) */}
                {builderTab === 'garment' && (
                  <div className="sub-section">
                    <h3 className="sub-section-title">Tag trang phục (Đã giữ nguyên tag)</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {GARMENTS
                        .filter(g => {
                          if (modelGender === 'male') {
                            return g.gender !== 'Nữ';
                          } else {
                            return g.gender !== 'Nam';
                          }
                        })
                        .map((g) => {
                          const isSelected = selectedGarment.id === g.id;
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
                )}

                {/* 2. TAB PHỤ KIỆN */}
                {builderTab === 'accessory' && (
                  <div className="space-y-6">
                    {/* Phân nhóm 1: Đồ đội đầu */}
                    <div className="sub-section">
                      <h3 className="sub-section-title">Đồ đội đầu</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setSelectedHeadwear(null)}
                          className={`builder-btn ${selectedHeadwear === null ? 'active' : ''}`}
                        >
                          ✕ Không đội đầu
                        </button>
                        {HEADWEAR
                          .filter(hw => {
                            if (modelGender === 'male') {
                              return !hw.gender.startsWith('Nữ');
                            } else {
                              return !hw.gender.startsWith('Nam');
                            }
                          })
                          .map((hw) => {
                            const isSelected = selectedHeadwear?.id === hw.id;
                            return (
                              <button
                                key={hw.id}
                                type="button"
                                onClick={() => setSelectedHeadwear(hw)}
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
                      <div className="grid grid-cols-3 gap-2.5">
                        {FOOTWEAR.map((fw) => {
                          const isSelected = selectedFootwear.id === fw.id;
                          return (
                            <button
                              key={fw.id}
                              type="button"
                              onClick={() => setSelectedFootwear(fw)}
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
                        {JEWELRY.map((jw) => {
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
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setSelectedHandheld('none')}
                          className={`builder-btn ${selectedHandheld === 'none' ? 'active' : ''}`}
                        >
                          ✕ Không cầm đồ
                        </button>
                        {HANDHELD.map((hh) => {
                          const isSelected = selectedHandheld === hh.id;
                          return (
                            <button
                              key={hh.id}
                              type="button"
                              onClick={() => setSelectedHandheld(hh.id)}
                              className={`builder-btn ${isSelected ? 'active' : ''}`}
                            >
                              {hh.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
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
          className="lightbox" 
          role="dialog" 
          aria-modal="true" 
          aria-label="Phóng to ảnh"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxOpen(false);
          }}
        >
          {/* Nút gạt M/F và nút đóng trong Lightbox */}
          <div className="absolute top-3.5 right-4 z-60 flex items-center gap-3">
            <div className="model-switch-container !relative !top-auto !right-auto shadow-md">
              <button
                type="button"
                role="switch"
                aria-checked={modelGender === 'female'}
                aria-label="Chuyển đổi người mẫu Nam (M) và Nữ (F)"
                onClick={handleToggleGender}
                className={`model-switch-toggle ${modelGender === 'female' ? 'active-female' : ''}`}
                title={modelGender === 'male' ? 'Đang chọn mẫu Nam (M) - Gạt để chuyển sang mẫu Nữ (F)' : 'Đang chọn mẫu Nữ (F) - Gạt để chuyển sang mẫu Nam (M)'}
              >
                <span className="model-switch-thumb">
                  {modelGender === 'male' ? 'M' : 'F'}
                </span>
              </button>
            </div>
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
