import NavigationBar from "@/components/utilities/NavigationBar";

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
