import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contacts } from "./data/contacts";


export function NavBar() {
  return (
    <div className="fixed top-4 inset-x-0 z-40">
      <div className="mx-auto max-w-6xl px-4">
        <div className="backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 flex items-center justify-between bg-white/5 shadow-[0_0_1px_1px_rgba(255,255,255,.04)]">
          <a href="#home" className="text-sm font-medium tracking-wide opacity-90 ml-5">{contacts.name}</a>
          <div className="hidden sm:flex items-center gap-2">
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#contact" className="nav-link">Contact</a>

            {/* две отдельные кнопки печати */}


            {/*<ExportPDFButton /> */}
            <Button asChild size="l" className="ml-2">
              <a
                href="screen.pdf"
                download
                className="flex items-center gap-2"
              >
                <FileDown className="h-4 w-4" />
                <span>Export PDF</span>
              </a>
            </Button>


          </div>
        </div>
      </div>
    </div>
  );
}