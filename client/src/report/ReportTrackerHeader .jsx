import { NavLink } from "react-router-dom";

function ReportTrackerHeader() {
  return (
    <div className="sticky top-0 bg-blue-300 dark:bg-black dark:text-white text-black  hidden xl:block  p-2 z-30">
      <div className="flex  justify-between md:justify-end space-x-6 font-bold">
        <NavLink
          to="/reports/purchasereport"
          className="px-1 py-1 no-underline rounded hover:text-white hover:bg-black dark:hover:bg-gradient-to-r from-green-400 to-blue-500"
        >
          purchasereport
        </NavLink>
        <NavLink
          to="/reports/paymentreport"
          className="px-1 py-1 no-underline rounded hover:text-white hover:bg-black dark:hover:bg-gradient-to-r from-green-400 to-blue-500"
        >
          paymentreport
        </NavLink>
        <NavLink
          to="/reports/salesereports"
          className="px-1 py-1 no-underline rounded hover:text-white hover:bg-black dark:hover:bg-gradient-to-r from-green-400 to-blue-500"
        >
          salesereports
        </NavLink>
        <NavLink
          to="/reports/receiptreports"
          className="px-1 py-1 no-underline rounded hover:text-white hover:bg-black dark:hover:bg-gradient-to-r from-green-400 to-blue-500"
        >
          receiptreports
        </NavLink>
        <NavLink
          to="/reports/journalreports"
          className="px-1 py-1 no-underline rounded hover:text-white hover:bg-black dark:hover:bg-gradient-to-r from-green-400 to-blue-500"
        >
          journalreports
        </NavLink>
        <NavLink
          to="/reports/invoice-preview"
          className="px-1 py-1 no-underline rounded hover:text-white hover:bg-black dark:hover:bg-gradient-to-r from-green-400 to-blue-500"
        >
          invoice preview
        </NavLink>
        <NavLink
          to="/reports/ledgerlist"
          className="px-1 py-1 no-underline rounded hover:text-white hover:bg-black dark:hover:bg-gradient-to-r from-green-400 to-blue-500"
        >
          All Ledger
        </NavLink>
        <NavLink
          to="/reports/incomemain"
          className="px-1 py-1 no-underline rounded hover:text-white hover:bg-black dark:hover:bg-gradient-to-r from-green-400 to-blue-500"
        >
          Single Ledger
        </NavLink>
        <NavLink
          to="/reports/droupreports"
          className="px-1 py-1 no-underline rounded hover:text-white hover:bg-black dark:hover:bg-gradient-to-r from-green-400 to-blue-500"
        >
          Groups
        </NavLink>
      </div>
    </div>
  );
}

export default ReportTrackerHeader;
