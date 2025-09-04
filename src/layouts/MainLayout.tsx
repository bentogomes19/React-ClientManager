import { useEffect, useState, ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ChartNoAxesCombined,
  Users,
  ListFilter,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const toggleSidebarMobile = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`
          bg-sky-700 text-white transition-all duration-300 ease-in-out
          fixed top-0 left-0 h-full z-40 md:relative
          ${isSidebarOpen && !isMobile ? "w-[250px]" : ""}
          ${!isSidebarOpen && !isMobile ? "w-[90px]" : ""}
          ${isSidebarOpen && isMobile ? "w-full" : ""}
          ${!isSidebarOpen && isMobile ? "hidden" : ""}
        `}
      >
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="
            absolute 
            top-[100px] right-0 
            -translate-y-1/2 translate-x-1/2
            bg-sky-800 hover:bg-sky-950
            text-white font-bold 
            rounded-full
            transition-colors duration-200 
            w-8 h-8 
            flex items-center justify-center
            shadow-md
            "
          >
            {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
        )}

        <div className="flex flex-col items-center justify-center mt-8 mb-8">
          <div
            className="pacifico-regular"
            style={{
              fontSize: !isSidebarOpen && !isMobile ? "10px" : "25px",
              margin: "8px 0",
            }}
          >
            ClientManager
          </div>

          <div className="flex flex-col gap-2 w-full items-center">
            <Link
              to="/relatorios"
              onClick={toggleSidebarMobile}
              className="w-[90%] h-10 md:h-12 flex items-center justify-center rounded-lg hover:bg-sky-50 transition-colors duration-200 gap-3 px-4 text-white"
            >
              <ChartNoAxesCombined style={{ fontSize: 20 }} />
              {(isSidebarOpen || isMobile) && "Relatórios"}
            </Link>

            <Link
              to="/clientes"
              onClick={toggleSidebarMobile}
              className="w-[90%] h-10 md:h-12 flex items-center justify-center rounded-lg hover:bg-sky-50 transition-colors duration-200 gap-3 px-4 text-white"
            >
              <Users style={{ fontSize: 20 }} />
              {(isSidebarOpen || isMobile) && "Clientes"}
            </Link>
          </div>
        </div>
      </aside>

      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 right-4 w-10 h-10 border border-white/15 rounded-md bg-sky-900 text-white z-50 flex items-center justify-center shadow-md"
        >
          {isSidebarOpen ? <X /> : <ListFilter />}
        </button>
      )}

      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <main
        className={`
          flex-1 p-4 md:p-8 transition-all duration-300 ease-in-out
          ${isSidebarOpen && !isMobile ? "md:ml-[250px]" : ""}
          ${!isSidebarOpen && !isMobile ? "md:ml-[90px]" : ""}
        `}
      >
        {children}
      </main>
    </div>
  );
}
