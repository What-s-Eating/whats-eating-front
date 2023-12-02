import { GetServerSideProps } from "next";

const PlaceDetail = () => {
  return <div>Place Detail</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log(params);

  return {
    props: {},
  };
};

export default PlaceDetail;
