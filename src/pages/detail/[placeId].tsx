import { Comment, PlaceDetail } from "@/types/place";
import { Client, SearchClient } from "@/utils/fetcher";
import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import Button from "@/components/Button";
import { classNames } from "@/utils/utils";
import { Nanum_Gothic } from "next/font/google";
import { nanumGothic } from "@/utils/fonts";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const PlaceDetailPage: NextPage<{
  place: PlaceDetail;
  comments: Comment[];
}> = ({ place, comments }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [star, setStar] = useState<number>(0);
  const [isCommenting, setIsCommenting] = useState(false);

  const postComment = async () => {
    setIsCommenting(true);

    try {
      await Client.post(
        `/place/${place.basicInfo.cid}/reviews`,
        {
          content: comment,
          star: star.toString(),
        },
        {
          headers: {
            Authorization: session?.user.accessToken,
          },
        }
      );

      router.reload();
    } catch (e) {
      console.log(e);
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <div className="flex flex-row items-center py-3 max-w-screen-2xl min-w-[280px] mx-auto px-5 mt-16">
      <div className="flex flex-col w-full">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">
            {place.basicInfo.placenamefull}
          </span>
          <span className="text-sm text-gray-500">
            {place.basicInfo.address.region.newaddrfullname}{" "}
            {place.basicInfo.address.newaddr.newaddrfull}{" "}
            {place.basicInfo.address.addrdetail}
          </span>
        </div>
        <PlaceImageSlider
          images={place.photo.photoList[0].list.map(photo => photo.orgurl)}
        />
        <div className="flex flex-row w-full pt-5">
          <div className="flex flex-col w-full border p-5 rounded-[20px] space-y-1.5">
            {place.basicInfo.phonenum && (
              <div className="flex flex-row items-center justify-between text-base">
                <span className="text-gray-500">전화번호</span>
                <span className="font-bold ml-2">
                  {place.basicInfo.phonenum}
                </span>
              </div>
            )}
            {place.basicInfo.homepage && (
              <div className="flex flex-row items-center justify-between text-base">
                <span className="text-gray-500">홈페이지</span>
                <span className="font-bold ml-2">
                  {place.basicInfo.homepage}
                </span>
              </div>
            )}
            <div className="flex lg:flex-row flex-col items-start lg:items-center justify-between text-base border-b pb-4">
              <span className="text-gray-500">주소</span>
              <span className="font-bold lg:ml-2 ml-0">
                {place.basicInfo.address.region.newaddrfullname}{" "}
                {place.basicInfo.address.newaddr.newaddrfull}{" "}
                {place.basicInfo.address.addrdetail}
              </span>
            </div>
            <div className="flex lg:flex-row flex-col items-start lg:items-center justify-between text-base pt-2">
              <span className="text-gray-500">영업시간</span>
              <span className="lg:ml-2 ml-0 font-bold space-x-2">
                {place.basicInfo.openHour ? (
                  <>
                    {place.basicInfo.openHour?.periodList.map((period, index) =>
                      period.timeList.map((time, index) => (
                        <span key={index}>
                          {time.dayOfWeek} {time.timeSE}
                        </span>
                      ))
                    )}
                  </>
                ) : (
                  <>등록된 영업시간이 없습니다.</>
                )}
              </span>
            </div>
          </div>
        </div>
        {place.menuInfo && (
          <div className="flex flex-col mt-5">
            <span className="text-xl font-bold ml-1">메뉴</span>
            <div className="flex flex-col w-full border p-5 rounded-[20px] space-y-1.5 mt-2">
              <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-4 gap-2">
                {place.menuInfo.menuList.map((menu, index) => (
                  <div
                    key={index}
                    className={classNames(
                      "flex flex-row items-center justify-between text-base border-b pb-2"
                    )}
                  >
                    <span className="text-gray-500">{menu.menu}</span>
                    <span className="font-bold ml-2">{menu.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col mt-5">
          <span className="text-xl font-bold ml-1">리뷰</span>
          <div className="flex flex-row mt-1">
            <div
              className="flex flex-col w-full"
              onClick={() => {
                if (!session) {
                  router.push(`/auth/login?redirect=${router.asPath}`);
                }
              }}
            >
              <textarea
                placeholder={
                  session
                    ? "리뷰를 작성해주세요."
                    : "로그인 후 리뷰를 작성할 수 있습니다."
                }
                onChange={e => setComment(e.target.value)}
                className="p-4 border rounded-[20px] mt-2 bg-stone-100 outline-none resize-none"
                style={{ height: "130px" }}
                disabled={!session}
              />
              <div className="flex flex-row justify-between mt-2">
                <div className="flex flex-row space-x-1 ml-2">
                  {[1, 2, 3, 4, 5].map((starFocus, index) => (
                    <button
                      disabled={!session}
                      key={index}
                      onClick={() => setStar(starFocus)}
                    >
                      <Star fill={starFocus <= star ? true : false} />
                    </button>
                  ))}
                </div>
                <Button
                  disabled={!session}
                  onClick={postComment}
                  variant="outline"
                  className="w-24 border border-gray-200 hover:border-gray-300 rounded-[20px] hover:bg-gray-100 text-black ring-0"
                >
                  등록
                </Button>
              </div>
            </div>
          </div>
          <hr className="my-5" />

          <div className="flex flex-col space-y-3 mt-2 pb-10">
            {comments
              .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
              .map((comment, index) => (
                <div
                  key={index}
                  className="flex flex-col w-full border p-5 rounded-[20px] space-y-1.5"
                >
                  <div className="flex flex-row items-center justify-between text-base">
                    <div className="flex flex-row items-center">
                      <span className="text-gray-500">{comment.userName}</span>
                      {comment.platform === "kakao" && (
                        <div className="relative w-[20px] h-[18px] items-center justify-center flex ml-1">
                          <Image
                            src="/icons/kakao-symbol.svg"
                            alt="kakao"
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      )}
                    </div>
                    <div
                      className={classNames(
                        "flex flex-row space-x-1 items-center justify-center -mt-1",
                        nanumGothic.className
                      )}
                    >
                      {[1, 2, 3, 4, 5].map((starFocus, index) => (
                        <Star
                          key={index}
                          fill={
                            starFocus <= Number(comment.star) ? true : false
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <pre
                    className={classNames(
                      "text-base whitespace-pre-wrap pt-1",
                      nanumGothic.className
                    )}
                  >
                    {comment.content}
                  </pre>
                  <span className="font-medium ml-auto">
                    {dayjs(comment.date).format("YYYY. MM. DD")}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Star = ({ fill }: { fill: boolean }) => {
  return (
    <Image
      src={fill ? "/icons/star-fill-icon.svg" : "/icons/star-icon.svg"}
      alt="star"
      width={20}
      height={20}
    />
  );
};

const PlaceImageSlider = ({ images }: { images: string[] }) => {
  const [activePage, setActivePage] = useState(0);

  return (
    <div className="relative w-full mt-3">
      <div
        className="absolute right-3 bottom-3 items-center flex justify-center rounded-[10px]"
        style={{
          background: "rgba(0, 0, 0, 0.32)",
          zIndex: 5,
        }}
      >
        <span className="text-white text-xs px-2 py-1 rounded-full">
          {activePage + 1} / {images.length}
        </span>
      </div>
      <Swiper
        className="relative rounded-[20px] overflow-hidden h-[500px] border"
        slidesPerView={2}
        onSlideChange={swiper => setActivePage(swiper.activeIndex)}
        style={{
          width: "100%",
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="relative">
            <Image alt="ad" src={image} layout="fill" objectFit="cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const place = (await SearchClient(
    `/kakao/place_info/${params?.placeId}`
  )) as {
    data: {
      result: PlaceDetail;
    };
  };
  const reviews = (await Client(`/place/${params?.placeId}/reviews`)) as {
    data: Comment[];
  };

  const comments: Comment[] = place.data.result.comment.list.map(comment => {
    return {
      id: comment.commentid,
      userId: comment.kakaoMapUserId,
      userName: comment.username,
      date: comment.date,
      star: comment.point,
      content: comment.contents,
      platform: "kakao",
    } as unknown as Comment;
  });
  comments.push(...reviews.data);

  if (!place.data.result) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      place: place.data.result,
      comments: comments,
    },
  };
};

export default PlaceDetailPage;
