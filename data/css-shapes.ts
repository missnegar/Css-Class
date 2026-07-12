export interface CssShape {
  id: string;
  name: string;
  css: string;
}

export const CSS_SHAPES: CssShape[] = [
  {
    id: 'square',
    name: 'مربع',
    css: `
.shape {
  width: 100px;
  height: 100px;
  background: #6366f1;
}`
  },
  {
    id: 'rectangle',
    name: 'مستطیل',
    css: `
.shape {
  width: 150px;
  height: 100px;
  background: #6366f1;
}`
  },
  {
    id: 'circle',
    name: 'دایره',
    css: `
.shape {
  width: 100px;
  height: 100px;
  background: #6366f1;
  border-radius: 50%;
}`
  },
  {
    id: 'oval',
    name: 'بیضی',
    css: `
.shape {
  width: 150px;
  height: 100px;
  background: #6366f1;
  border-radius: 50%;
}`
  },
  {
    id: 'triangle-up',
    name: 'مثلث (رو به بالا)',
    css: `
.shape {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid #6366f1;
}`
  },
  {
    id: 'triangle-down',
    name: 'مثلث (رو به پایین)',
    css: `
.shape {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 100px solid #6366f1;
}`
  },
  {
    id: 'trapezoid',
    name: 'ذوزنقه',
    css: `
.shape {
  width: 100px;
  height: 0;
  border-bottom: 100px solid #6366f1;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
}`
  },
  {
    id: 'parallelogram',
    name: 'متوازی‌الاضلاع',
    css: `
.shape {
  width: 150px;
  height: 100px;
  background: #6366f1;
  transform: skew(20deg);
}`
  },
  {
    id: 'star-six',
    name: 'ستاره شش‌پر',
    css: `
.shape {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid #6366f1;
  position: relative;
}
.shape:after {
  content: '';
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 100px solid #6366f1;
  position: absolute;
  top: 30px;
  left: -50px;
}`
  },
  {
    id: 'star-five',
    name: 'ستاره پنج‌پر',
    css: `
.shape {
  margin: 50px 0;
  position: relative;
  display: block;
  color: #6366f1;
  width: 0px;
  height: 0px;
  border-right: 100px solid transparent;
  border-bottom: 70px solid #6366f1;
  border-left: 100px solid transparent;
  transform: rotate(35deg);
}
.shape:before {
  border-bottom: 80px solid #6366f1;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  position: absolute;
  height: 0;
  width: 0;
  top: -45px;
  left: -65px;
  display: block;
  content: '';
  transform: rotate(-35deg);
}
.shape:after {
  position: absolute;
  display: block;
  color: #6366f1;
  top: 3px;
  left: -105px;
  width: 0px;
  height: 0px;
  border-right: 100px solid transparent;
  border-bottom: 70px solid #6366f1;
  border-left: 100px solid transparent;
  transform: rotate(-70deg);
  content: '';
}`
  },
  {
    id: 'pentagon',
    name: 'پنج‌ضلعی',
    css: `
.shape {
  position: relative;
  width: 54px;
  border-width: 50px 18px 0;
  border-style: solid;
  border-color: #6366f1 transparent;
}
.shape:before {
  content: "";
  position: absolute;
  height: 0;
  width: 0;
  top: -85px;
  left: -18px;
  border-width: 0 45px 35px;
  border-style: solid;
  border-color: transparent transparent #6366f1;
}`
  },
    {
    id: 'hexagon',
    name: 'شش‌ضلعی',
    css: `
.shape {
  width: 100px;
  height: 57.74px;
  background-color: #6366f1;
  position: relative;
}
.shape::before {
  content: "";
  position: absolute;
  top: -28.87px;
  left: 0;
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 28.87px solid #6366f1;
}
.shape::after {
  content: "";
  position: absolute;
  bottom: -28.87px;
  left: 0;
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 28.87px solid #6366f1;
}`
  },
  {
    id: 'heart',
    name: 'قلب',
    css: `
.shape {
  position: relative;
  width: 100px;
  height: 90px;
}
.shape:before,
.shape:after {
  position: absolute;
  content: "";
  left: 50px;
  top: 0;
  width: 50px;
  height: 80px;
  background: #ef4444;
  border-radius: 50px 50px 0 0;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
}
.shape:after {
  left: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;
}`
  },
  {
    id: 'pacman',
    name: 'پک‌من',
    css: `
.shape {
  width: 0px;
  height: 0px;
  border-right: 60px solid transparent;
  border-top: 60px solid #facc15;
  border-left: 60px solid #facc15;
  border-bottom: 60px solid #facc15;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
  border-bottom-left-radius: 60px;
  border-bottom-right-radius: 60px;
}`
  },
   {
    id: 'cross',
    name: 'صلیب',
    css: `
.shape {
  background: #6366f1;
  height: 100px;
  position: relative;
  width: 20px;
}
.shape:after {
  background: #6366f1;
  content: "";
  height: 20px;
  left: -40px;
  position: absolute;
  top: 40px;
  width: 100px;
}`
  },
];
