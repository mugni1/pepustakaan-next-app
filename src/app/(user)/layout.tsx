import NavigationBar from "@/components/User/NavigationBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <NavigationBar />
    </>
  );
}
