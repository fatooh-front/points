import useGetDataOfPage from "../hooks/useGetDataOfPage";
import LemozenPriceForm from "./blocks/lemozen-price-form";

// import TSwitchField from "@/main/common/components/TForm/TSwitchField";

const Page = () => {
  const { data } = useGetDataOfPage();

  return (
    <div className="box-border w-full flex items-center flex-col min-h-dvh-64px ">
      {data?.content?.map((car) => (
        <LemozenPriceForm key={car.id} car={car} />
      ))}
    </div>
  );
};

export default Page;
