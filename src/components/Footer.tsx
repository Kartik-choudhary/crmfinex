import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[#e2e8f0]">
      <div className="container-max py-8 text-sm text-[#64748b] flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} CRMFinex. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="https://www.linkedin.com/company/crmfinex" target="_blank" rel="noopener noreferrer" className="hover:text-[#0b1020] transition-colors">LinkedIn</Link>
          <Link href="mailto:kartik.choudhary@crmfinex.com" className="hover:text-[#0b1020] transition-colors">Email</Link>
        </div>
      </div>
    </footer>
  );
}


