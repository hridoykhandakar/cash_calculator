type PropsType = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  weight: string;
  finalWeight: number;
  show: boolean;
  disable: boolean;
  fishBid: number;
  setFishBid: React.Dispatch<React.SetStateAction<number>>;
  handleWeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  finalPrice: number;
  handleCalculation: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClear: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleAddValue: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Inputs = ({
  name,
  setName,
  weight,
  finalWeight,
  show,
  disable,
  fishBid,
  setFishBid,
  handleWeightChange,
  finalPrice,
  handleCalculation,
  handleClear,
  handleAddValue,
}: PropsType) => {
  return (
    <div>
      <form className=" flex flex-col gap-5">
        <div className=" flex flex-col gap-3 ">
          <label htmlFor="name">মাছের নাম</label>
          <div className="">
            <select
              className="input border-2 p-2  rounded"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            >
              <option className="" value="others">
                অন্যান্য
              </option>
              <option value="rui">রুই</option>
              <option value="mrige">মৃগে</option>
              <option value="telapia">তেলা:</option>
              <option value="silvar">সিল:/বিগ:</option>
              <option value="japani">জাপ:</option>
            </select>
          </div>
        </div>
        <div className=" flex flex-col gap-3">
          <label htmlFor="name">মাছের দাম </label>
          <input
            name="bid"
            type="text"
            className="border-2 p-2 input rounded"
            placeholder="3200"
            value={fishBid === 0 || Number.isNaN(fishBid) ? "" : fishBid}
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
    </div>
  );
};
export default Inputs;
