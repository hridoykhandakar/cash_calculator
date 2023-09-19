import { useEffect, useState } from "react";
import Memo from "./components/Memo";

export default function App() {
  interface FinalObject {
    id: number;
    name: string;
    weight: string;
    bid: number;
    price: number;
    finalWeight: number;
  }
  // State
  const [name, setName] = useState("others");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [fishBid, setFishBid] = useState(0);
  const [weight, setWeight] = useState("");
  const [finalWeight, setFinalWeight] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [show, setShow] = useState(true);
  const [disable, setDisable] = useState(true);
  const [historyObj, setHistoryObj] = useState<FinalObject>({
    id: 0,
    name: "",
    bid: 0,
    weight: "",
    finalWeight: 0,
    price: 0,
  });

  const [histories, setHistories] = useState<FinalObject[]>([]);

  // Memo state
  const [tax, setTax] = useState(0);
  const [commission, setCommission] = useState(0);
  const [othersCost, setOthersCost] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // modal
  // function
  // effect

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setWeight(e.target.value);

  function addWeight(list: number[]) {
    let weight = 0;
    list.map((item) => (weight += item));
    return weight;
  }
  function calculatePrice(price: number, weights: number[]): number {
    const weight = addWeight(weights);
    const a = weight - (weight / 100) * 5;
    const b = Number(a.toFixed(1));
    setFinalWeight(b);
    return Math.floor((a / 40) * price);
  }
  // handle function
  function handleCalculation(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const list = weight.split("+").map(Number);

    setDisable(!disable);
    const price = calculatePrice(fishBid, list);
    setFinalPrice(price);
    const history: FinalObject = {
      id: Date.now(),
      name: name,
      bid: fishBid,
      weight: weight,
      finalWeight: Number(
        (addWeight(list) - (addWeight(list) / 100) * 5).toFixed(1)
      ),
      price,
    };
    setHistoryObj(history);
  }
  function handleClear(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setFishBid(0);
    setWeight("");
    setFinalPrice(0);
    setFinalWeight(0);
    setDisable(!disable);
    setShow((prev) => !prev);
    setName("others");
  }
  function handleAddValue(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setShow((prev) => !prev);
    setHistories([historyObj, ...histories]);
    console.log(histories);
  }
  function handleFinalCal(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    let totalPrice = 0;
    let totalWeight = 0;
    histories.map((item) => {
      totalPrice += item.price;
      totalWeight += item.finalWeight;
    });
    setTotalPrice(Math.round(totalPrice));
    setTotalWeight(parseFloat(totalWeight.toFixed(2)));
    const x = totalWeight / 40;
    setOthersCost(Math.round(x * 20 + 8));
    const y = (totalPrice / 100) * 4;
    setCommission(Math.round(y));
    setTax(Math.round(x * 10));

    openModal();
  }
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm: string | number = today.getMonth() + 1; // Months start at 0!
  let dd: string | number = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;

  const now = today.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  // useEffect
  useEffect(() => {
    const z = totalPrice - (tax + othersCost + commission);
    setFinalTotal(Math.round(z));
  }, [commission, othersCost, tax, totalPrice]);

  const fishObj = {
    others: "অন্যান্য",
    rui: "রুই",
    mirge: "মৃগে",
    telapia: "তেলা:",
    silver: "সিল:/বিগ",
    japani: "জাপ:",
  };

  return (
    <>
      <Memo isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col">
          <h1 className="text-center font-bold text-2xl my-6 underline underline-offset-8 decoration-purple-900">
            খন্দকার ইন্তাজ ফিস
          </h1>
          <div className="flex justify-between">
            <div className="date">Date: {formattedToday}</div>
            <div className="time">Time: {now}</div>
          </div>
        </div>
        <div className=" w-full  flex">
          <div className=" w-full ">
            <div className="flex flex-col">
              <div className=" ">
                <div className="inline-block min-w-full py-2 ">
                  <div className="overflow-hidden">
                    <table className="min-w-full border text-center  font-light dark:border-neutral-500">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th
                            scope="col"
                            className="border-r   dark:border-neutral-500"
                          >
                            কি মাছ
                          </th>
                          <th
                            scope="col"
                            className="border-r  dark:border-neutral-500"
                          >
                            ওজন
                          </th>
                          <th
                            scope="col"
                            className="border-r  dark:border-neutral-500"
                          >
                            দর
                          </th>
                          <th scope="col" className="">
                            দাম
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {histories.map((item) => (
                          <tr
                            key={item.bid}
                            className="border-b dark:border-neutral-500"
                          >
                            <td className="whitespace-nowrap border-r px-2 py-1 font-medium dark:border-neutral-500">
                              {fishObj[item.name as keyof object]}
                            </td>
                            <td className="whitespace-nowrap border-r px-2 py-1 dark:border-neutral-500">
                              {item.finalWeight}
                            </td>
                            <td className="whitespace-nowrap border-r px-2 py-1 dark:border-neutral-500">
                              {item.bid}
                            </td>
                            <td className="whitespace-nowrap ">{item.price}</td>
                          </tr>
                        ))}
                        <tr className="border-b dark:border-neutral-500">
                          <td
                            colSpan={2}
                            className="whitespace-nowrap border-r px-2 py-2 font-medium dark:border-neutral-500"
                          >
                            মোট মাছঃ {totalWeight} kg
                          </td>
                          <td
                            colSpan={2}
                            className="whitespace-nowrap border-r px-2 py-2 font-medium dark:border-neutral-500"
                          >
                            ক্যাঁচা বিক্রিঃ {totalPrice} tk
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th
                            scope="row"
                            colSpan={3}
                            className=" py-3 px-2  border-b-2  text-sm font-light text-center text-red-500 "
                          >
                            কমিশন
                          </th>

                          <td className="  py-3 px-2 border-b-2  text-sm text-center text-red-500 ">
                            - <strong>{commission}</strong> TK
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            colSpan={3}
                            className="  py-3 px-2  border-b-2 text-sm font-light text-center text-red-500 "
                          >
                            কয়েলি
                          </th>

                          <td className=" py-3 px-2 border-b-2 text-sm text-center text-red-500 ">
                            - <strong>{othersCost}</strong> TK
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            colSpan={3}
                            className="  py-3 px-2 border-b-2 text-sm font-light text-center text-red-500 "
                          >
                            খাজনা
                          </th>

                          <td className=" py-3 px-2 border-b-2 text-sm text-center text-red-500 ">
                            - <strong>{tax}</strong> TK
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            colSpan={3}
                            className=" py-3 px-2  border-b-2 text-base  font-normal text-center text-green-700 "
                          >
                            Total
                          </th>

                          <td className=" border-b-2 text-base font-normal text-center text-green-700 ">
                            <strong>{finalTotal}</strong> TK
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Memo>

      <main className="min-h-screen shadow-lg bg-slate-100 max-w-sm border-2 mx-auto flex flex-col gap-5 px-4">
        <div className="top">
          <h1 className="text-center text-2xl underline underline-offset-4 decoration-pink-500">
            Cash Memo Calculator
          </h1>
        </div>
        <div className="middle flex flex-col gap-4">
          <form className=" flex flex-col gap-5">
            <div className=" flex flex-col gap-3">
              <label htmlFor="name">মাছের নাম</label>
              <select
                className="input border-2 p-2 rounded"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              >
                <option value="others">অন্যান্য</option>
                <option value="rui">রুই</option>
                <option value="mrige">মৃগে</option>
                <option value="telapia">তেলা:</option>
                <option value="silvar">সিল:/বিগ:</option>
                <option value="japani">জাপ:</option>
              </select>
            </div>
            <div className=" flex flex-col gap-3">
              <label htmlFor="name">মাছের দাম </label>
              <input
                name="bid"
                type="text"
                className="border-2 p-2 input rounded"
                placeholder="3200"
                value={fishBid === 0 ? "" : fishBid}
                onChange={(e) => {
                  setFishBid(parseInt(e.target.value));
                }}
              />
            </div>
            <div className=" flex flex-col gap-3">
              <label htmlFor="name">মাছের ওজন</label>
              <input
                name="weight"
                type="text"
                className="input border-2 p-4 rounded"
                placeholder="24+25+22"
                value={weight}
                onChange={handleWeightChange}
              />
            </div>
            <div className="preview flex justify-between ">
              <div className="">
                <p>
                  ওজন: <strong> {finalWeight} </strong>কেজি
                </p>
                <p>
                  দাম: <strong> {finalPrice} </strong> টাকা
                </p>
              </div>
            </div>
            <div className="button flex justify-between">
              {show ? (
                <button
                  disabled={disable}
                  onClick={handleAddValue}
                  className={`btn ${disable ? "bg-gray-700" : "bg-yellow-600"}`}
                >
                  হিসেবে অন্তর্ভুক্ত করুন
                </button>
              ) : (
                <button onClick={handleClear} className="btn bg-green-600">
                  নতুন হিসাব শুরু করুন
                </button>
              )}
              <button onClick={handleCalculation} className="btn bg-blue-600">
                দাম হিসাব করুন
              </button>
            </div>
          </form>
          <div className="list border max-h-40  overflow-scroll overflow-x-hidden overflow-y-scroll no-scrollbar p-2">
            <ul className="flex flex-col gap-2">
              {histories.map((item) => (
                <li
                  key={item.price}
                  className="overflow-scroll overflow-y-hidden overflow-x-scroll no-scrollbar "
                >
                  <div className="flex gap-2">
                    {/* <p className="">{fishObj.`${item.name}`}:</p> */}
                    <p className="">{fishObj[item.name as keyof object]}</p>
                    <p className="">{item.weight}</p>
                  </div>
                  <div className="flex justify-between">
                    <span>দর: {item.bid}</span>
                    <span>ওজন: {item.finalWeight}</span>
                    <span>দাম: {item.price}</span>
                    <button className="  px-2 py-1 rounded text-white bg-purple-600">
                      Update
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bottom flex w-full">
          <button onClick={handleFinalCal} className="btn w-full bg-red-600">
            হিসাব করুন
          </button>
          {/* <button className="btn bg-pink-600">সংরক্ষণ করুন</button> */}
        </div>
      </main>
    </>
  );
}
