export interface AnimationCategory {
  name: string;
  animations: string[];
}

export const ANIMATION_CATEGORIES: AnimationCategory[] = [
  {
    name: 'افکت‌های ویژه',
    animations: ['glitch']
  },
  {
    name: 'Attention Seekers',
    animations: [
      'bounce', 'flash', 'pulse', 'rubberBand', 'shakeX', 'shakeY', 'headShake', 
      'swing', 'tada', 'wobble', 'jello', 'heartBeat'
    ]
  },
  {
    name: 'Back Entrances',
    animations: ['backInDown', 'backInLeft', 'backInRight', 'backInUp']
  },
  {
    name: 'Back Exits',
    animations: ['backOutDown', 'backOutLeft', 'backOutRight', 'backOutUp']
  },
  {
    name: 'Bouncing Entrances',
    animations: ['bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp']
  },
  {
    name: 'Bouncing Exits',
    animations: ['bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp']
  },
  {
    name: 'Fading Entrances',
    animations: [
      'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 
      'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'fadeInTopLeft', 
      'fadeInTopRight', 'fadeInBottomLeft', 'fadeInBottomRight'
    ]
  },
  {
    name: 'Fading Exits',
    animations: [
      'fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 
      'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig', 'fadeOutTopLeft', 
      'fadeOutTopRight', 'fadeOutBottomRight', 'fadeOutBottomLeft'
    ]
  },
  {
    name: 'Flippers',
    animations: ['flip', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY']
  },
  {
    name: 'Lightspeed',
    animations: ['lightSpeedInRight', 'lightSpeedInLeft', 'lightSpeedOutRight', 'lightSpeedOutLeft']
  },
  {
    name: 'Rotating Entrances',
    animations: ['rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight']
  },
  {
    name: 'Rotating Exits',
    animations: ['rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight']
  },
  {
    name: 'Specials',
    animations: ['hinge', 'jackInTheBox', 'rollIn', 'rollOut']
  },
  {
    name: 'Zooming Entrances',
    animations: ['zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp']
  },
  {
    name: 'Zooming Exits',
    animations: ['zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp']
  },
  {
    name: 'Sliding Entrances',
    animations: ['slideInDown', 'slideInLeft', 'slideInRight', 'slideInUp']
  },
  {
    name: 'Sliding Exits',
    animations: ['slideOutDown', 'slideOutLeft', 'slideOutRight', 'slideOutUp']
  }
];