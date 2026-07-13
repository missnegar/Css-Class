import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ShapeEditor from './components/ShapeEditor';
import Sidebar from './components/Sidebar';
import AnimatedTextGenerator from './components/AnimatedTextGenerator';
import AnimationGenerator from './components/AnimationGenerator';
import BorderRadiusGenerator from './components/BorderRadiusGenerator';
import BoxShadowGenerator from './components/BoxShadowGenerator';
import ButtonGenerator from './components/ButtonGenerator';
import CheckboxRadioGenerator from './components/CheckboxRadioGenerator';
import ClipPathGenerator from './components/ClipPathGenerator';
import ColumnGenerator from './components/ColumnGenerator';
import CubicBezierGenerator from './components/CubicBezierGenerator';
import ImageFilterGenerator from './components/ImageFilterGenerator';
import FlipSwitchGenerator from './components/FlipSwitchGenerator';
import FontGenerator from './components/FontGenerator';
import GradientGenerator from './components/GradientGenerator';
import GridGenerator from './components/GridGenerator';
import HighlighterGenerator from './components/HighlighterGenerator';
import InputRangeGenerator from './components/InputRangeGenerator';
import LayoutGenerator from './components/LayoutGenerator';
import MenuGenerator from './components/MenuGenerator';
import PatternGenerator from './components/PatternGenerator';
import RgbaGenerator from './components/RgbaGenerator';
import RibbonGenerator from './components/RibbonGenerator';
import RibbonBannerGenerator from './components/RibbonBannerGenerator';
import ScrollbarGenerator from './components/ScrollbarGenerator';
import SelectDropdownGenerator from './components/SelectDropdownGenerator';
import SpriteGenerator from './components/SpriteGenerator';
import TextGradientGenerator from './components/TextGradientGenerator';
import TextInputGenerator from './components/TextInputGenerator';
import TextRotateGenerator from './components/TextRotateGenerator';
import TextShadowGenerator from './components/TextShadowGenerator';
import TooltipGenerator from './components/TooltipGenerator';
import Transform3dGenerator from './components/Transform3dGenerator';
import CssAtRules from './components/CssAtRules';
import CssColorNames from './components/CssColorNames';
import CssDataTypes from './components/CssDataTypes';
import CssFunctions from './components/CssFunctions';
import CssPreloadersGenerator from './components/CssPreloadersGenerator';
import CssProperties from './components/CssProperties';
import CssPseudoClasses from './components/CssPseudoClasses';
import CssSelectors from './components/CssSelectors';
import CssShapes from './components/CssShapes';
import PreprocessorCompiler from './components/PreprocessorCompiler';
import CssConverter from './components/CssConverter';
import CssColorConverter from './components/CssColorConverter';
import CssCursorViewer from './components/CssCursorViewer';
import CssFontPreview from './components/CssFontPreview';
import CssFormatter from './components/CssFormatter';
import CssLengths from './components/CssLengths';
import CssOptimizer from './components/CssOptimizer';
import CssValidator from './components/CssValidator';
import ImageToDataUri from './components/ImageToDataUri';
import OnlineCssEditor from './components/OnlineCssEditor';
import DonationModal from './components/DonationModal';
import AboutModal from './components/AboutModal';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import { toolCategories } from './data/tools';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeToolId, setActiveToolId] = useState<string>('welcome');
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Find current tool and its category
  let currentCategoryName = '';
  let currentToolName = '';

  if (activeToolId === 'welcome') {
    currentCategoryName = 'خانه';
    currentToolName = 'صفحه اصلی';
  } else {
    for (const cat of toolCategories) {
      const tool = cat.tools.find(t => t.id === activeToolId);
      if (tool) {
        currentCategoryName = cat.name;
        currentToolName = tool.name;
        break;
      }
    }
  }

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleSelectTool = (toolId: string) => {
    setActiveToolId(toolId);
  };

  const renderActiveTool = () => {
    switch (activeToolId) {
      case 'welcome':
        return <Welcome onSelectTool={handleSelectTool} />;
      case 'shape-former':
        return <ShapeEditor />;
      case 'animated-text-generator':
        return <AnimatedTextGenerator />;
      case 'animation-generator':
        return <AnimationGenerator />;
      case 'border-radius-generator':
        return <BorderRadiusGenerator />;
      case 'box-shadow-generator':
        return <BoxShadowGenerator />;
      case 'button-generator':
        return <ButtonGenerator />;
      case 'checkbox-radio-generator':
        return <CheckboxRadioGenerator />;
      case 'clip-path-generator':
        return <ClipPathGenerator />;
      case 'column-generator':
        return <ColumnGenerator />;
      case 'cubic-bezier-generator':
        return <CubicBezierGenerator />;
      case 'image-filter-generator':
        return <ImageFilterGenerator />;
      case 'flip-switch-generator':
        return <FlipSwitchGenerator />;
      case 'font-generator':
        return <FontGenerator />;
      case 'gradient-generator':
        return <GradientGenerator />;
      case 'grid-generator':
        return <GridGenerator />;
      case 'highlighter-generator':
        return <HighlighterGenerator />;
      case 'input-range-generator':
        return <InputRangeGenerator />;
      case 'layout-generator':
        return <LayoutGenerator />;
      case 'menu-generator':
        return <MenuGenerator />;
      case 'pattern-generator':
        return <PatternGenerator />;
      case 'rgba-generator':
        return <RgbaGenerator />;
      case 'ribbon-generator':
        return <RibbonGenerator />;
      case 'ribbon-banner-generator':
        return <RibbonBannerGenerator />;
      case 'scrollbar-generator':
        return <ScrollbarGenerator />;
      case 'select-dropdown-generator':
        return <SelectDropdownGenerator />;
      case 'sprite-generator':
        return <SpriteGenerator />;
      case 'text-gradient-generator':
        return <TextGradientGenerator />;
      case 'text-input-generator':
        return <TextInputGenerator />;
      case 'text-rotate-generator':
        return <TextRotateGenerator />;
      case 'text-shadow-generator':
        return <TextShadowGenerator />;
      case 'tooltip-generator':
        return <TooltipGenerator />;
      case 'transform-3d-generator':
        return <Transform3dGenerator />;
      case 'css-at-rules':
        return <CssAtRules />;
      case 'css-color-names':
        return <CssColorNames />;
      case 'css-data-types':
        return <CssDataTypes />;
      case 'css-functions':
        return <CssFunctions />;
      case 'css-preloaders':
        return <CssPreloadersGenerator />;
      case 'css-properties':
        return <CssProperties />;
      case 'css-pseudo-classes':
        return <CssPseudoClasses />;
      case 'css-selectors':
        return <CssSelectors />;
      case 'css-shapes':
        return <CssShapes />;
      case 'less-to-css':
        return <PreprocessorCompiler type="less" />;
      case 'scss-to-css':
        return <PreprocessorCompiler type="scss" />;
      case 'stylus-to-css':
        return <PreprocessorCompiler type="stylus" />;
      case 'css-to-less':
        return <CssConverter type="less" />;
      case 'css-to-scss':
        return <CssConverter type="scss" />;
      case 'css-to-stylus':
        return <CssConverter type="stylus" />;
      case 'css-color-converter':
        return <CssColorConverter />;
      case 'css-cursor-viewer':
        return <CssCursorViewer />;
      case 'css-font-preview':
        return <CssFontPreview />;
      case 'css-formatter':
        return <CssFormatter />;
      case 'css-lengths':
        return <CssLengths />;
      case 'css-optimizer':
        return <CssOptimizer />;
      case 'css-validator':
        return <CssValidator />;
      case 'image-to-data-uri':
        return <ImageToDataUri />;
      case 'online-css-editor':
        return <OnlineCssEditor />;
      default:
        return <Welcome />;
    }
  };

  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex flex-col">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenDonationModal={() => setIsDonationModalOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onToggleSidebar={toggleSidebar}
      />
      <div className="flex-grow flex flex-row min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} activeToolId={activeToolId} onSelectTool={handleSelectTool} />
        <main className="flex-grow flex flex-col min-w-0 overflow-y-auto no-scrollbar">
          {/* Breadcrumb Navigation */}
          <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/60 px-6 py-3 flex items-center justify-between text-xs md:text-sm text-slate-500 dark:text-slate-400 font-sans shadow-xs shrink-0" dir="rtl">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleSelectTool('welcome')}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>خانه</span>
              </button>
              {currentCategoryName && currentCategoryName !== 'خانه' && (
                <>
                  <span className="text-slate-300 dark:text-slate-700 font-normal">/</span>
                  <span className="text-slate-400 dark:text-slate-500">
                    {currentCategoryName}
                  </span>
                </>
              )}
              {currentToolName && currentToolName !== 'صفحه اصلی' && (
                <>
                  <span className="text-slate-300 dark:text-slate-700 font-normal">/</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                    {currentToolName}
                  </span>
                </>
              )}
            </div>
            
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/60 px-2.5 py-1 rounded-md text-[10px] font-mono text-slate-400 dark:text-slate-500">
              <span className="font-sans">شناسه:</span>
              <span className="text-slate-600 dark:text-slate-300 font-semibold">{activeToolId}</span>
            </div>
          </div>

          <div key={activeToolId} className="flex-grow w-full flex flex-col animate__animated animate__fadeIn animate__faster">
            {renderActiveTool()}
          </div>
        </main>
      </div>
      <Footer />
      <DonationModal isOpen={isDonationModalOpen} onClose={() => setIsDonationModalOpen(false)} />
      <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
    </div>
  );
};

export default App;
