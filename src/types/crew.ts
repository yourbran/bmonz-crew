export interface Crew {
    crew_id: number;     // DB의 INTEGER
    crew_nm: string;     // 멤버 이름
    job_nm: string;      // 직업
    img_url: string;     // IMG URL
    clmb_st_dt: string;  // 등반 시작일
    prof_img: string;    // 프로필 이미지 URL
  }