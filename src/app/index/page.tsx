import Nav from "@/components/nav";
import GamesCatalog from "@/components/GamesCatalog";

export default function CatalogPage() {
  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Sidebar Navigation */}
      <div className="w-64 border-r border-gray-800 bg-gray-900">
        <Nav />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <GamesCatalog />
      </main>
    </div>
  );
}