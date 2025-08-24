import { Button } from "@/components/ui/button";
import Maseges from "./blocks/maseges";

export default function Page() {
  const employees: { name: string; id: string }[] = [
    { name: "Ahmed Ali", id: "EMP001" },
    { name: "Sara Mohamed", id: "EMP002" },
    { name: "Omar Hassan", id: "EMP003" },
    { name: "Fatma Adel", id: "EMP004" },
    { name: "Khaled Nabil", id: "EMP005" },
    { name: "Nourhan Youssef", id: "EMP006" },
    { name: "Mahmoud Tarek", id: "EMP007" },
    { name: "Laila Samir", id: "EMP008" },
    { name: "Mostafa Hani", id: "EMP009" },
    { name: "Mona Ibrahim", id: "EMP010" },
    { name: "Tamer Fathy", id: "EMP011" },
    { name: "Heba Salem", id: "EMP012" },
    { name: "Yasser Reda", id: "EMP013" },
    { name: "Nadia Fouad", id: "EMP014" },
    { name: "Sherif Gamal", id: "EMP015" },
    { name: "Rania Ahmed", id: "EMP016" },
    { name: "Wael Hussein", id: "EMP017" },
    { name: "Marwa Zaki", id: "EMP018" },
    { name: "Bassel Omar", id: "EMP019" },
    { name: "Hanan Magdy", id: "EMP020" },
  ];

  return (
    <div
      style={{
        boxShadow: "0px 2px 32px 0px #2F2B3D1F",
      }}
      className="  flex  w-full rounded-[8px] bg-[#F3F3F3] overflow-hidden h-[calc(100vh-110px)]  "
    >
      <div className="flex flex-col   flex-1 border-s ">
        <h1 className=" py-[30px] px-3 border-b bg-white">الموظفين</h1>
        <div className=" flex-1 overflow-y-auto p-4  ">
          {" "}
          <div>
            {employees.map((item) => (
              <div className=" flex border-b pt-4 pb-10 justify-between">
                <p>{item.name}</p>
                <Button>عرض المحادثة</Button>
              </div>
            ))}
          </div>
        </div>{" "}
      </div>
      <div className="flex flex-col   flex-1 border-s-2 bg-white">
        <h1 className=" py-[30px] px-3 border-b">المحادثات</h1>
        <div className=" flex-1 overflow-y-auto  ">
          {" "}
          <Maseges />
        </div>{" "}
      </div>
    </div>
  );
}
