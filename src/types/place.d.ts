export interface Place {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  date: string;

  star: string;
  content: string;
  platform: PlaceType;
}

export type PlaceType = "kakao" | "local";

export interface PlaceDetail {
  isMapUser: boolean;
  isExist: boolean;
  basicInfo: BasicInfo;
  s2graph: S2graph;
  blogReview: BlogReview;
  comment: CommentKakao;
  findway: Findway;
  placeOwnerInfos: PlaceOwnerInfos;
  menuInfo: MenuInfo;
  photo: Photo;
}

export interface BasicInfo {
  cid: number;
  placenamefull: string;
  mainphotourl: string;
  phonenum: string;
  address: Address;
  homepage: string;
  homepagenoprotocol: string;
  wpointx: number;
  wpointy: number;
  roadview: Roadview;
  category: Category;
  englishname: string;
  feedback: Feedback;
  openHour: OpenHour;
  facilityInfo: FacilityInfo;
  source: Source;
  regions: any[];
  isStation: boolean;
}

export interface Address {
  newaddr: Newaddr;
  region: Region;
  addrbunho: string;
  addrdetail: string;
}

export interface Newaddr {
  newaddrfull: string;
  bsizonno: string;
}

export interface Region {
  name3: string;
  fullname: string;
  newaddrfullname: string;
}

export interface Roadview {
  panoid: number;
  tilt: number;
  pan: number;
  wphotox: number;
  wphotoy: number;
  rvlevel: number;
}

export interface Category {
  cateid: string;
  catename: string;
  cate1name: string;
  fullCateIds: string;
}

export interface Feedback {
  allphotocnt: number;
  blogrvwcnt: number;
  comntcnt: number;
  scoresum: number;
  scorecnt: number;
}

export interface OpenHour {
  periodList: PeriodList[];
  offdayList: OffdayList[];
  realtime: Realtime;
}

export interface PeriodList {
  periodName: string;
  timeList: TimeList[];
}

export interface TimeList {
  timeName: string;
  timeSE: string;
  dayOfWeek: string;
}

export interface OffdayList {
  holidayName: string;
  weekAndDay: string;
  temporaryHolidays: string;
}

export interface Realtime {
  holiday: string;
  moreOpenOffInfoExists: string;
  datetime: string;
  matchedHoliday: MatchedHoliday;
}

export interface MatchedHoliday {
  holidayName: string;
  weekAndDay: string;
  temporaryHolidays: string;
}

export interface FacilityInfo {
  parking: string;
}

export interface Source {
  date: string;
}

export interface S2graph {
  status: string;
  day: Day;
  gender: Gender;
  age: Age;
  nearPlaceList: any[];
}

export interface Day {
  initData: number[];
  labels: string[];
  avg: number[];
  sunday: number[];
  monday: number[];
  tuesday: number[];
  wednesday: number[];
  thursday: number[];
  friday: number[];
  saturday: number[];
  max: number;
}

export interface Gender {
  labels: string[];
  data: number[];
  max: number;
}

export interface Age {
  labels: string[];
  data: number[];
  max: number;
}

export interface BlogReview {
  placenamefull: string;
  moreId: number;
  blogrvwcnt: number;
  list: List[];
}

export interface List {
  blogname: string;
  blogurl: string;
  contents: string;
  outlink: string;
  date: string;
  reviewid: string;
  title: string;
  photoList: PhotoList[];
  isMy: boolean;
}

export interface PhotoList {
  orgurl: string;
}

export interface CommentKakao {
  placenamefull: string;
  kamapComntcnt: number;
  scoresum: number;
  scorecnt: number;
  list: List2[];
  strengthCounts: StrengthCount[];
  hasNext: boolean;
  reviewWriteBlocked: string;
}

export interface List2 {
  commentid: string;
  contents: string;
  point: number;
  username: string;
  profile: string;
  profileStatus: string;
  photoCnt: number;
  likeCnt: number;
  thumbnail?: string;
  kakaoMapUserId: string;
  photoList: PhotoList2[];
  ownerReply: OwnerReply;
  userCommentCount: number;
  userCommentAverageScore: number;
  myStorePick: boolean;
  date: string;
  isMy: boolean;
  isBlock: boolean;
  isEditable: boolean;
  isMyLike: boolean;
  strengths?: Strength[];
}

export interface PhotoList2 {
  url: string;
  near: boolean;
}

export interface OwnerReply {}

export interface Strength {
  id: number;
  name: string;
}

export interface StrengthCount {
  id: number;
  name: string;
  count: number;
}

export interface Findway {
  x: number;
  y: number;
  subway: Subway[];
  busstop: Busstop[];
  busDirectionCheck: boolean;
}

export interface Subway {
  stationSimpleName: string;
  stationId: string;
  exitNum: string;
  toExitDistance: number;
  subwayList: SubwayList[];
  toExitMinute: number;
}

export interface SubwayList {
  subwayId: string;
  subwayName: string;
}

export interface Busstop {
  busStopId: string;
  busStopName: string;
  busStopDisplayId: string;
  toBusstopDistance: number;
  wpointx: number;
  wpointy: number;
  busInfo: BusInfo[];
}

export interface BusInfo {
  busType: string;
  busTypeCode: string;
  busList: BusList[];
  busNames: string;
}

export interface BusList {
  busId: string;
  busName: string;
  busTextName?: string;
}

export interface PlaceOwnerInfos {
  status: string;
  loginUserRelation: string;
  mainPhoto: string;
}

export interface MenuInfo {
  menucount: number;
  menuList: MenuList[];
  productyn: string;
  menuboardphotourlList: string[];
  menuboardphotocount: number;
}

export interface MenuList {
  price: string;
  recommend: boolean;
  menu: string;
}

export interface Photo {
  photoList: PhotoList3[];
}

export interface PhotoList3 {
  photoCount: number;
  categoryName: string;
  list: List3[];
}

export interface List3 {
  photoid: string;
  orgurl: string;
}
