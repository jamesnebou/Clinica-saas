import "./globals.css";

export const metadata = {
  title: "Clinica SaaS",
  description: "Sistema SaaS para gestao de clinicas de estetica.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
