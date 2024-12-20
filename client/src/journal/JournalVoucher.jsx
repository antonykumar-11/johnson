import { useState, useEffect } from "react";
import {
  useCreateJournalVoucherMutation,
  useCheckVoucherNumberQuery,
} from "../store/api/journalVoucherApi";
import LedgerMiddleWares from "../middlewares/LedgerMiddleWares";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Ledger from "../vouchers/dummy2/Ledger";
import {
  useGetLedgerQuery,
  useCreateLedgerMutation,
} from "../store/api/LedgerApi";
import useTheme from "../context/Theme";
import { FaBook } from "react-icons/fa";
const JournalVoucher = () => {
  const [voucherData, setVoucherData] = useState({
    voucherType: "Journal Voucher",
    voucherNumber: "",
    date: "",
    debitLedgers: [{ ledgerId: "", ledgerName: "", amount: "" }],
    creditLedgers: [{ ledgerId: "", ledgerName: "", amount: "" }],
    description: "",
  });
  const [askHelp, setAskHelp] = useState(false); // State to manage modal visibility
  const openLedgerModal = () => setIsLedgerModalOpen(true);
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState(false);
  const closeLedgerModal = () => setIsLedgerModalOpen(false);
  const [localLedgerData, setLocalLedgerData] = useState([]); // Local ledger state for dropdown
  const [createLedger] = useCreateLedgerMutation(); // Hook for creating new ledger
  const openModalAsk = () => {
    setAskHelp(true); // Function to open the modal
  };

  const closeModalAsk = () => {
    setAskHelp(false); // Function to close the modal
  };
  const { data: voucherCheck, refetch: VocherCheckRefecth } =
    useCheckVoucherNumberQuery();
  // Handle voucher number check
  useEffect(() => {
    if (voucherCheck && voucherCheck.length > 0) {
      // Extract existing voucher numbers
      const existingVoucherNumbers = voucherCheck.map(
        (voucher) => voucher.voucherNumber
      );

      // Find the maximum voucher number
      const maxVoucherNumber = Math.max(...existingVoucherNumbers, -1);

      // Set the new voucher number
      const newVoucherNumber = maxVoucherNumber + 1;

      // Update the purchase data
      setVoucherData((prevData) => ({
        ...prevData,
        voucherNumber: newVoucherNumber, // Set the incremented voucher number
      }));
    }
  }, [voucherCheck]);

  const {
    data: ledgers = [],
    isLoading,
    isError,
    refetch,
  } = useGetLedgerQuery();
  const [createJournalVoucher] = useCreateJournalVoucherMutation();
  const { themeMode } = useTheme();

  const handleLedgerChange = (index, ledgerType, ledger) => {
    const updatedLedgers = [...voucherData[ledgerType]];
    updatedLedgers[index] = {
      ...updatedLedgers[index],
      ledgerId: ledger._id,
      ledgerName: ledger.name,
    };
    setVoucherData((prevData) => ({
      ...prevData,
      [ledgerType]: updatedLedgers,
    }));
  };

  const handleAmountChange = (index, ledgerType, value) => {
    const updatedLedgers = [...voucherData[ledgerType]];
    updatedLedgers[index].amount = value;
    setVoucherData((prevData) => ({
      ...prevData,
      [ledgerType]: updatedLedgers,
    }));
  };

  const handleAddLedger = (ledgerType) => {
    setVoucherData((prevData) => ({
      ...prevData,
      [ledgerType]: [
        ...prevData[ledgerType],
        { ledgerId: "", ledgerName: "", amount: "" },
      ],
    }));
  };
  useEffect(() => {
    refetch();
  }, [refetch]);
  // ivide nammal dropdown ledger create cheyynnu
  const handleLedgerCreation = async (newLedgerData) => {
    console.log("Creating new ledger:", newLedgerData);
    try {
      const newLedger = await createLedger(newLedgerData).unwrap();
      setLocalLedgerData((prev) => [...prev, newLedger]);
      refetch(); // Ensure the dropdown shows the latest data
      toast.success("Ledger created successfully!");
      closeLedgerModal(); // Close the modal on success
    } catch (error) {
      console.error("Error creating ledger:", error);
      toast.error(error?.data?.message || "Failed to create ledger");
    }
  };

  const handleRemoveLedger = (index, ledgerType) => {
    const updatedLedgers = [...voucherData[ledgerType]];
    if (updatedLedgers.length > 1) {
      updatedLedgers.splice(index, 1);
      setVoucherData((prevData) => ({
        ...prevData,
        [ledgerType]: updatedLedgers,
      }));
    }
  };

  const handleChange = (e) => {
    setVoucherData({
      ...voucherData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createJournalVoucher(voucherData);
      console.log("response", response);
      if (response?.data?.voucherType === "Journal Voucher") {
        toast.success("Journal created successfully!");
        VocherCheckRefecth();
        setVoucherData({
          voucherType: "Journal Voucher",
          voucherNumber: "",
          date: "",
          debitLedgers: [{ ledgerId: "", ledgerName: "", amount: "" }],
          creditLedgers: [{ ledgerId: "", ledgerName: "", amount: "" }],
          description: "",
        });
      } else {
        toast.error("Failed to create Journal Voucher");
      }
    } catch (error) {
      console.error("API call error:", error);
      toast.error("An error occurred while creating the voucher", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching voucher data</div>;

  const containerClass = `max-w-4xl mx-auto p-6 shadow-lg rounded-lg ${
    themeMode === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
  }`;

  const inputClass = `mt-1 block w-full rounded-md border-2 ${
    themeMode === "dark"
      ? "bg-gray-700 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
      : "bg-white text-black border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
  } h-12`;

  const buttonClassAdd = `inline-flex items-center px-3 py-1 rounded-md ${
    themeMode === "dark"
      ? "text-white bg-green-600 hover:bg-green-700"
      : "text-white bg-green-500 hover:bg-green-600"
  }`;

  const buttonClassRemove = `inline-flex items-center px-3 py-1 rounded-md ${
    themeMode === "dark"
      ? "text-white bg-red-600 hover:bg-red-700"
      : "text-white bg-red-500 hover:bg-red-600"
  }`;

  return (
    <div className="flex flex-col min-h-screen -mt-[72px]">
      <ToastContainer />
      <main className="flex-grow flex justify-center items-center p-4">
        <div className={containerClass}>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Create Journal Voucher
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <label className="block text-sm font-medium">
                  Voucher Number
                </label>
                <input
                  type="text"
                  name="voucherNumber"
                  value={voucherData.voucherNumber}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Date</label>
                <input
                  type="date"
                  name="date"
                  value={voucherData.date}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Debit Ledger Section */}
            <h3 className="text-lg font-semibold mt-6">Debit Ledger</h3>
            {voucherData.debitLedgers.map((debitLedger, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
              >
                {console.log("debitLedger", debitLedger)}
                <LedgerMiddleWares
                  options={ledgers}
                  value={debitLedger.ledgerName}
                  onChange={(ledger) =>
                    handleLedgerChange(index, "debitLedgers", ledger)
                  }
                  selectedLedger={ledgers.find(
                    (l) => l._id === debitLedger.ledgerId
                  )}
                  themeMode={themeMode}
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={debitLedger.amount}
                  onChange={(e) =>
                    handleAmountChange(index, "debitLedgers", e.target.value)
                  }
                  className={inputClass}
                />
                <button
                  type="button"
                  className={buttonClassAdd}
                  onClick={() => handleAddLedger("debitLedgers")}
                >
                  Add
                </button>
                <button
                  type="button"
                  className={buttonClassRemove}
                  onClick={() => handleRemoveLedger(index, "debitLedgers")}
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Credit Ledger Section */}
            <h3 className="text-lg font-semibold mt-6">Credit Ledger</h3>
            {voucherData.creditLedgers.map((creditLedger, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
              >
                <LedgerMiddleWares
                  options={ledgers}
                  value={creditLedger.ledgerName}
                  onChange={(ledger) =>
                    handleLedgerChange(index, "creditLedgers", ledger)
                  }
                  selectedLedger={ledgers.find(
                    (l) => l._id === creditLedger.ledgerId
                  )}
                  themeMode={themeMode}
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={creditLedger.amount}
                  onChange={(e) =>
                    handleAmountChange(index, "creditLedgers", e.target.value)
                  }
                  className={inputClass}
                />
                <button
                  type="button"
                  className={buttonClassAdd}
                  onClick={() => handleAddLedger("creditLedgers")}
                >
                  Add
                </button>
                <button
                  type="button"
                  className={buttonClassRemove}
                  onClick={() => handleRemoveLedger(index, "creditLedgers")}
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Description Section */}
            <div className="mt-6">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={voucherData.description}
                onChange={handleChange}
                className={`${inputClass} h-auto`}
                style={{ minHeight: "4rem" }} // Initially small
                rows={1} // Default row size
                onInput={(e) => {
                  e.target.style.height = "auto"; // Reset height
                  e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height based on content
                }}
              />
            </div>
          </form>
          {/* Submit Button */}
          <div className="flex flex-col md:flex-row justify-end mt-6 gap-4 gap-y-4">
            <div
              onClick={openModalAsk} // On button click, open the modal
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center"
            >
              Any Help
            </div>

            <button
              onClick={openLedgerModal}
              className="flex items-center justify-center bg-blue-500 text-white p-2 rounded hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800"
            >
              <FaBook className="mr-2" /> {/* Add icon */}
              Add Ledger
            </button>

            {isLedgerModalOpen && (
              <Ledger
                closeModal={closeLedgerModal}
                onLedgerCreate={handleLedgerCreation}
              />
            )}

            <div
              onClick={handleSubmit} // Call handleSubmit when the div is clicked
              className={`px-4 py-2 rounded-md font-semibold cursor-pointer text-center ${
                themeMode === "dark"
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-indigo-500 text-white hover:bg-indigo-600"
              }`}
            >
              Create Journol
            </div>
          </div>

          {askHelp && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 overflow-y-auto">
              <div className="bg-white lg:mr-24 rounded-lg p-6 md:p-8 max-w-lg md:max-w-6xl mx-auto relative shadow-lg border border-blue-300">
                <button
                  onClick={closeModalAsk} // Close modal when "Thank You" is clicked
                  className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
                >
                  Thank You
                </button>
                <h2 className="text-xl font-bold text-center mb-4 text-blue-600 tracking-wide">
                  Information Guide
                </h2>
                <div className="overflow-y-auto max-h-[70vh]">
                  {" "}
                  {/* Limit height for scrolling */}
                  <p className="text-sm mb-4 leading-relaxed tracking-wide">
                    GST ഉൾപ്പെടാത്ത എല്ലാ ട്രാന്സാക്ഷനും (transaction ) ഇവിടെ
                    രേഖപ്പെടുത്തണം . സൈൽസും (sale), പർച്ചെയ്‌സും (purchase)
                    ഇവിടെ രേഖപെടുത്തരുത്. ബാക്കിയുള്ള മുഴുൻ transaction ഇവിടെ
                    രേഖപെടുത്താം
                  </p>
                  <p className="text-sm mb-4 leading-relaxed tracking-wide">
                    <span className="font-bold mr-2">Debit Ledger:</span>
                    ഇവിടെ ഇവ മാത്രം upayokikkuka
                  </p>
                  <p className="text-sm mb-4 leading-relaxed tracking-wide">
                    <span className="font-bold mr-2">1 :</span>
                    എല്ലാ Indirect Exenses ചെലവുകളും ഇവിടെ രേഖപ്പെടുത്തണം
                  </p>
                  <p className="text-sm mb-4 leading-relaxed tracking-wide">
                    <span className="font-bold mr-2">2 :</span>
                    GST ഉൾപ്പെടാത്ത നമുക്ക് വരുന്ന എല്ലാ പൈസയും ( cash) ഇവിടെ
                    Cash-In-hand കീഴിൽ വാങ്ങുക .
                  </p>
                  <p className="text-sm mb-4 leading-relaxed tracking-wide ">
                    <span className="font-bold mr-2">3 :</span>
                    കമ്പനിയിൽ ഉണ്ടാകുന്ന ഒരു വർഷത്തിൽ കൂടുതൽ ഇരിക്കുന്ന
                    കമ്പനിയുടെ സ്വത്തുക്കൾ ( fixed Assets ) ഇത് Fixed Assets
                    കീഴിൽ വരണം .ഉദാഹരണം കമ്പനിയുടെ വാഹനങ്ങൾ.
                  </p>
                  <p className="text-sm mb-4 leading-relaxed tracking-wide ">
                    <span className="font-bold mr-2">4 :</span>
                    കമ്പനിയിൽ ഉണ്ടാകുന്ന ഒരു വർഷത്തിനുള്ളിൽ പൈസയാക്കാവുന്ന
                    സ്വത്തുക്കൾ ( Current Assets ) ഇത് Current Assets കീഴിൽ വരണം
                    .ഉദാഹരണം കമ്പനിയുടെ Furniture.
                  </p>
                  <p className="text-sm mb-4 leading-relaxed tracking-wide ">
                    <span className="font-bold mr-2">5 :</span>
                    കമ്പനിയ്ക്കു എവിടെയെങ്കിലും Investments ഇവിടെ Investments
                    കീഴിൽ രേഖപ്പെടുത്തണം .ഉദാഹരണം കമ്പനിയുടെ building , share .
                  </p>
                  <p className="text-sm mb-4 leading-relaxed tracking-wide ">
                    <span className="font-bold mr-2">6 :</span>
                    കമ്പനിയ്ക്കു എവിടെയെങ്കിലും സ്റ്റോക്ക് ഉണ്ടെങ്കിൽ ഇവിടെ
                    Stock-In_hand കീഴിൽ രേഖപ്പെടുത്തണം .ഉദാഹരണം കമ്പനിയുടെ
                    insurance like
                  </p>
                  <p className="text-sm mb-4 leading-relaxed tracking-wide ">
                    <span className="font-bold mr-2">7 :</span>
                    കമ്പനി ആർക്കെങ്കിലും വായ്പ കൊടുത്തുട്ടുണ്ടെങ്കിൽ ഇവിടെ Loans
                    & Advances (Asset) കീഴിൽ രേഖപ്പെടുത്തണം
                  </p>
                  <p className="text-sm mb-4 leading-relaxed tracking-wide ">
                    <span className="font-bold mr-2">8 :</span>
                    കമ്പനി എവിടെയെങ്കിലും എന്തെങ്കിലും ഡെപ്പോസിറ്റ് ( Deposits)
                    ഇട്ടിട്ടുണ്ടെങ്കിൽ Deposits (Assets) കീഴിൽ രേഖപ്പെടുത്തണം
                  </p>
                  <p className="text-sm mb-4 leading-relaxed tracking-wide ">
                    <span className="font-bold mr-2">Credit Ledger :</span>
                  </p>
                  <p className="text-sm mb-4 leading-relaxed tracking-wide ">
                    <span className="font-bold mr-2"> 1 :</span>
                    GST ഉൾപ്പെടാതെ നമുക്ക് വരുന്ന എല്ലാ പൈസയുടെയും ചിലവുകൾ ഇവിടെ
                    രേഖപ്പെടുത്തണം
                  </p>
                  <p className="text-sm mb-4 leading-relaxed tracking-wide ">
                    <span className="font-bold mr-2"> 2 :</span>
                    Owner കൊണ്ട് വരുന്ന എല്ലാം ഇവിടെ Capital Account കീഴിൽ
                    രേഖപ്പെടുത്തണം
                  </p>
                  <p className="text-sm mb-4 leading-relaxed tracking-wide ">
                    <span className="font-bold mr-2"> 3 :</span>
                    കമ്പനിയിൽ വരുന്ന എല്ലാ കടങ്ങളും ഇവിടെ Current Liabiliteis
                    കീഴിൽ രേഖപ്പെടുത്തണം
                  </p>
                  <p className="text-sm mb-4 leading-relaxed tracking-wide ">
                    <span className="font-bold mr-2">4 :</span>
                    കമ്പനി എടുത്തിട്ടുള്ള ഒരു വർഷത്തിൽ കൂടുതൽ അടയ്‌ക്കേണ്ട
                    കടങ്ങൾ ഇവിടെ Loans ( Liability) കീഴിൽ രേഖപ്പെടുത്തണം .
                  </p>
                  <p className="text-sm mb-4 leading-relaxed tracking-wide ">
                    <span className="font-bold mr-2">5 :</span>
                    കമ്പനിയിലുള്ള Bank overDraft കൾ ഇവിടെ Bank OD Accounts കീഴിൽ
                    രേഖപ്പെടുത്തണം
                  </p>
                  <p className="text-sm mb-4 leading-relaxed tracking-wide ">
                    <span className="font-bold mr-2">6 :</span>
                    കമ്പനി എടുത്തിട്ടുള്ള Unsecure ലോണുകൾ ഇവിടെ Unsecured Loans
                    കീഴിൽ രേഖപ്പെടുത്തുക
                  </p>
                  <p className="text-sm mb-4 leading-relaxed tracking-wide ">
                    <span className="font-bold mr-2">7 :</span>
                    കമ്പനി എടുത്തിട്ടുള്ള Secured ലോണുകൾ ഇവിടെ Secure Loans
                    കീഴിൽ രേഖപ്പെടുത്തുക
                  </p>
                  <p className="text-sm mb-4 leading-relaxed tracking-wide ">
                    <span className="font-bold mr-2">7 :</span>
                    കമ്പനി എടുത്തിട്ടുള്ള Secured ലോണുകൾ ഇവിടെ Secure Loans
                    കീഴിൽ രേഖപ്പെടുത്തുക
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default JournalVoucher;
