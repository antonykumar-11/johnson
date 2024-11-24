import React, { useState, useEffect } from "react";
import { useGetAllInvoicesQuery } from "../store/api/InvoicesApi";
import Invoice from "../invoice/Invoice";

const InvoiceContainer = () => {
  const {
    data: invoicesResponse,
    error,
    isLoading,
    refetch,
  } = useGetAllInvoicesQuery();

  // Correctly access the invoices and sales arrays
  const invoiceList = invoicesResponse?.data?.invoices || [];
  const salesList = invoicesResponse?.data?.sales || [];
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    if (selectedInvoice) {
      refetch();
    }
  }, [selectedInvoice, refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateTotal = (items) => {
    let subtotal = 0;

    items.forEach((item) => {
      const rate = Number(item.rate);
      const quantity = Number(item.quantity) || 1;
      subtotal += rate * quantity;
    });

    const taxRate = items.length > 0 ? Number(items[0].taxRate) : 0;

    const cgst = (subtotal * (taxRate / 2)) / 100;
    const sgst = (subtotal * (taxRate / 2)) / 100;

    const total = subtotal + cgst + sgst;
    return total;
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {selectedInvoice ? (
        <Invoice data={selectedInvoice} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Invoices</h2>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              onClick={refetch}
            >
              Refresh
            </button>
          </div>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Invoice No</th>
                <th className="py-2 px-4 border-b">Company Name</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {salesList.map((sale) => (
                <tr key={sale._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    {sale.saleInvoiceNumber}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {/* Display the company name related to the invoice */}
                    {invoiceList.length > 0 &&
                    invoiceList.find(
                      (invoice) => invoice._id === sale.invoiceId
                    )
                      ? invoiceList.find(
                          (invoice) => invoice._id === sale.invoiceId
                        ).companyName
                      : "No company found"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formatDate(sale.transactionDate)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {calculateTotal(sale.items).toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      onClick={() => setSelectedInvoice(sale)}
                    >
                      View Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default InvoiceContainer;
