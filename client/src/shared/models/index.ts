export interface User {
  id: number;
  name: string;
}

export const enum BusinessType {
  비즈니스 = '비즈니스',
  친목 = '친목'
}

export const enum TimeSlot {
  점심 = '점심',
  저녁 = '저녁',
}
export const enum MeetingPlaceStatus {
  RECOMMEND = 'RECOMMEND',
  GONE = 'GONE',
  DISMISS = 'DISMISS',
}