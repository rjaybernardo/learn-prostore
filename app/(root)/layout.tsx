import Footer from "@/components/footer";
import Header from "@/components/shared/header";

const RootGroupLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="wrapper flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default RootGroupLayout;
