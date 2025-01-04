import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[rgb(15,26,31)] border-t border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-md mx-auto flex justify-center space-x-6">
          <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/docs" className="text-white/70 hover:text-white transition-colors">
            Docs
          </Link>
        </div>
      </div>
    </footer>
  );
}