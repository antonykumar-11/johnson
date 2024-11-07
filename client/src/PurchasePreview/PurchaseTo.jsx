// import { useState } from "react";

// function PurchaseTo({ allState, handleNestedChange11, handleNestedChange22 }) {
//   const purchaseTo = allState.purchaseTo || {};
//   console.log("purchaseto", purchaseTo);
//   const authorizedBy = allState.authorizedBy || {};
//   return (
//     <div className="w-[95%] mx-auto mt-8 p-6 bg-yellow-400 shadow-md rounded-lg payment-to">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
//         <div className="mb-4">
//           <label className="block text-gray-700">Purchaseto Name</label>
//           <input
//             type="text"
//             id="purchaseToName"
//             name="companyName"
//             value={purchaseTo.companyName || ""}
//             onChange={handleNestedChange11}
//             placeholder="Payment To"
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Address</label>
//           <textarea
//             type="text"
//             id="purchaseToAddress"
//             name="companyAddress"
//             value={purchaseTo.companyAddress || ""}
//             onChange={handleNestedChange11}
//             placeholder="Payment To Address"
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">GST</label>
//           <input
//             type="text"
//             id="purchaseToGstNumber"
//             name="gstNumber"
//             value={purchaseTo.gstNumber || ""}
//             onChange={handleNestedChange11}
//             placeholder="Payment To GST"
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">State</label>
//           <input
//             type="text"
//             id="purchaseToState"
//             name="state"
//             value={purchaseTo.state || ""}
//             onChange={handleNestedChange11}
//             placeholder="Payment To State"
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Invoice Number</label>
//           <input
//             type="text"
//             id="purchaseToInvoiceNumber"
//             name="invoiceNumber"
//             value={purchaseTo.invoiceNumber || ""}
//             onChange={handleNestedChange11}
//             placeholder="Payment To Invoice Number"
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Invoice Date</label>
//           <input
//             type="date"
//             id="purchaseToInvoiceDate"
//             name="invoiceDate"
//             value={purchaseTo.invoiceDate || ""}
//             onChange={handleNestedChange11}
//             placeholder="Payment To Invoice Date"
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Delivery Note</label>
//           <input
//             type="text"
//             id="purchaseToDeliveryNote"
//             name="deliveryNote"
//             value={purchaseTo.deliveryNote || ""}
//             onChange={handleNestedChange11}
//             placeholder="Payment To Delivery Note"
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Payment Type</label>
//           <input
//             type="text"
//             id="purchaseToModeTermsOfPayment"
//             name="modeTermsOfPayment"
//             value={purchaseTo.modeTermsOfPayment || ""}
//             onChange={handleNestedChange11}
//             placeholder="Payment Type"
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Order Number</label>
//           <input
//             type="text"
//             id="purchaseToBuyersOrderNumber"
//             name="buyersOrderNumber"
//             value={purchaseTo.buyersOrderNumber || ""}
//             onChange={handleNestedChange11}
//             placeholder="Buyer's Order Number"
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Email</label>
//           <input
//             type="email"
//             id="purchaseToCompanyEmail"
//             name="companyEmail"
//             value={purchaseTo.companyEmail || ""}
//             onChange={handleNestedChange11}
//             placeholder="Payment to Email"
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Phone</label>
//           <input
//             type="number"
//             id="purchaseToCompanyMobile"
//             name="companyMobile"
//             value={purchaseTo.companyMobile || ""}
//             onChange={handleNestedChange11}
//             placeholder="Payment to Phone Number"
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Pan number</label>
//           <input
//             type="text"
//             id="purchaseToCompanyPanNumber"
//             name="companyPanNumber"
//             value={purchaseTo.companyPanNumber || ""}
//             onChange={handleNestedChange11}
//             placeholder="Payment PAN Number"
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700"> Supply Date</label>
//           <input
//             type="date"
//             id="purchaseToSupplyDate"
//             name="supplyDate"
//             value={purchaseTo.supplyDate || ""}
//             onChange={handleNestedChange11}
//             placeholder="Payment Supply Date"
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Bank name</label>
//           <input
//             type="text"
//             id="bankName"
//             name="bankName"
//             value={purchaseTo.bankName || ""}
//             onChange={handleNestedChange11}
//             placeholder="bank name"
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Account Number</label>
//           <input
//             type="text"
//             id="accountNumber"
//             name="accountNumber"
//             value={purchaseTo.accountNumber || ""}
//             onChange={handleNestedChange11}
//             placeholder="account number"
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">IFCE : code</label>
//           <input
//             type="text"
//             id="ifcecode"
//             name="ifcecode"
//             value={purchaseTo.ifcecode || ""}
//             onChange={handleNestedChange11}
//             placeholder="ifce code"
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Branch</label>
//           <input
//             type="text"
//             id="branch"
//             name="branch"
//             value={purchaseTo.branch || ""}
//             onChange={handleNestedChange11}
//             placeholder="branch name"
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">authorizedBy name</label>
//           <input
//             type="text"
//             id="authorizedByName"
//             name="name"
//             value={authorizedBy.name || ""}
//             onChange={handleNestedChange22}
//             placeholder="authorizedby"
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">designation</label>
//           <input
//             type="text"
//             id="designation"
//             name="designation"
//             value={authorizedBy.designation || ""}
//             onChange={handleNestedChange22}
//             placeholder="designation"
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">signature</label>
//           <input
//             type="text"
//             id="signature"
//             name="signature"
//             value={authorizedBy.signature || ""}
//             onChange={handleNestedChange22}
//             placeholder="signature"
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PurchaseTo;
import { useRef } from "react";

function PurchaseTo({ allState, handleNestedChange11, handleNestedChange22 }) {
  const purchaseTo = allState.purchaseTo || {};
  const authorizedBy = allState.authorizedBy || {};

  const inputRefs = useRef([]);

  // Add a ref to the inputRefs array
  const addInputRef = (element) => {
    if (element && !inputRefs.current.includes(element)) {
      inputRefs.current.push(element);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.shiftKey) {
        // Move to previous input
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        // Move to next input
        if (index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    }
  };

  const inputs = [
    {
      id: "purchaseToName",
      name: "companyName",
      placeholder: "Payment To",
      value: purchaseTo.companyName || "",
    },
    {
      id: "purchaseToAddress",
      name: "companyAddress",
      placeholder: "Payment To Address",
      value: purchaseTo.companyAddress || "",
      type: "textarea",
    },
    {
      id: "purchaseToGstNumber",
      name: "gstNumber",
      placeholder: "Payment To GST",
      value: purchaseTo.gstNumber || "",
    },
    {
      id: "purchaseToState",
      name: "state",
      placeholder: "Payment To State",
      value: purchaseTo.state || "",
    },
    {
      id: "purchaseToInvoiceNumber",
      name: "invoiceNumber",
      placeholder: "Payment To Invoice Number",
      value: purchaseTo.invoiceNumber || "",
    },
    {
      id: "purchaseToInvoiceDate",
      name: "invoiceDate",
      placeholder: "Payment To Invoice Date",
      value: purchaseTo.invoiceDate || "",
      type: "date",
    },
    {
      id: "purchaseToDeliveryNote",
      name: "deliveryNote",
      placeholder: "Payment To Delivery Note",
      value: purchaseTo.deliveryNote || "",
    },
    {
      id: "purchaseToModeTermsOfPayment",
      name: "modeTermsOfPayment",
      placeholder: "Payment Type",
      value: purchaseTo.modeTermsOfPayment || "",
    },
    {
      id: "purchaseToBuyersOrderNumber",
      name: "buyersOrderNumber",
      placeholder: "Buyer's Order Number",
      value: purchaseTo.buyersOrderNumber || "",
    },
    {
      id: "purchaseToCompanyEmail",
      name: "companyEmail",
      placeholder: "Payment to Email",
      value: purchaseTo.companyEmail || "",
      type: "email",
    },
    {
      id: "purchaseToCompanyMobile",
      name: "companyMobile",
      placeholder: "Payment to Phone Number",
      value: purchaseTo.companyMobile || "",
      type: "number",
    },
    {
      id: "purchaseToCompanyPanNumber",
      name: "companyPanNumber",
      placeholder: "Payment PAN Number",
      value: purchaseTo.companyPanNumber || "",
    },
    {
      id: "purchaseToSupplyDate",
      name: "supplyDate",
      placeholder: "Payment Supply Date",
      value: purchaseTo.supplyDate || "",
      type: "date",
    },
    {
      id: "bankName",
      name: "bankName",
      placeholder: "Bank Name",
      value: purchaseTo.bankName || "",
    },
    {
      id: "accountNumber",
      name: "accountNumber",
      placeholder: "Account Number",
      value: purchaseTo.accountNumber || "",
    },
    {
      id: "ifcecode",
      name: "ifcecode",
      placeholder: "IFCE Code",
      value: purchaseTo.ifcecode || "",
    },
    {
      id: "branch",
      name: "branch",
      placeholder: "Branch Name",
      value: purchaseTo.branch || "",
    },
    {
      id: "authorizedByName",
      name: "name",
      placeholder: "Authorized By",
      value: authorizedBy.name || "",
    },
    {
      id: "designation",
      name: "designation",
      placeholder: "Designation",
      value: authorizedBy.designation || "",
    },
    {
      id: "signature",
      name: "signature",
      placeholder: "Signature",
      value: authorizedBy.signature || "",
    },
  ];

  return (
    <div className="w-[95%] mx-auto mt-8 p-6 bg-yellow-400 shadow-md rounded-lg payment-to">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {inputs.map((input, index) => (
          <div key={input.id} className="mb-4">
            <label className="block text-gray-700">{input.placeholder}</label>
            {input.type === "textarea" ? (
              <textarea
                id={input.id}
                name={input.name}
                value={input.value}
                onChange={handleNestedChange11}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={addInputRef}
                placeholder={input.placeholder}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            ) : (
              <input
                type={input.type || "text"}
                id={input.id}
                name={input.name}
                value={input.value}
                onChange={handleNestedChange11}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={addInputRef}
                placeholder={input.placeholder}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PurchaseTo;
