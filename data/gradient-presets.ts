export interface GradientPreset {
  name: string;
  gradient: string;
}

export const PRESET_GRADIENTS: GradientPreset[] = [
  { name: 'غروب', gradient: 'linear-gradient(90deg, #FF7E5F, #FEB47B)' },
  { name: 'اقیانوس', gradient: 'linear-gradient(90deg, #2193b0, #6dd5ed)' },
  { name: 'نعنایی', gradient: 'linear-gradient(90deg, #56ab2f, #a8e063)' },
  { name: 'بنفش', gradient: 'linear-gradient(90deg, #673AB7, #512DA8)' },
  { name: 'صورتی', gradient: 'linear-gradient(90deg, #e96443, #904e95)' },
  { name: 'آبی تیره', gradient: 'linear-gradient(90deg, #232526, #414345)' },
  { name: 'رنگین‌کمان', gradient: 'linear-gradient(90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)' },
  { name: 'طلایی', gradient: 'linear-gradient(90deg, #FFD700, #F0E68C)' },
];