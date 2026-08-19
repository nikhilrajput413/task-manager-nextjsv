export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body>
        {/* Header/Navbar yaha ho sakta hai */}
        {children}
      </body>
    </html>
  );
}