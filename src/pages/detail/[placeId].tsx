import { PlaceDetail } from "@/types/place";
import { SearchClient } from "@/utils/fetcher";
import { GetServerSideProps, NextPage } from "next";

const PlaceDetailPage: NextPage<{
  place: PlaceDetail;
}> = ({ place }) => {
  return (
    <div className="flex flex-row items-center py-3 max-w-screen-2xl mx-auto px-5 mt-16">
      <div className="flex flex-col">
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
        <div className="flex flex-col mt-5">
          <span className="text-sm text-gray-500">전화번호</span>
          <span className="text-base font-bold">
            {place.basicInfo.phonenum}
          </span>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const place = await SearchClient(`/kakao/place_info/${params?.placeId}`);

  if (!place.data.result) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      place: place.data.result,
    },
  };
};

export default PlaceDetailPage;
