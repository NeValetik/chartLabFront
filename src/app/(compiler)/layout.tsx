import Header from "@/components/common/Header";

const  Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Layout
