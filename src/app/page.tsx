import ThemeSwitch from "@/components/ThemeSwitch";
import Form from "./components/Form";

const App = () => {
  return (
    <main className="flex-1 dark:bg-zinc-950 transition-all flex flex-col gap-5 items-center justify-center">
      <ThemeSwitch />
      <h2 className="font-semibold text-2xl">Send a YouTube Video to AI</h2>
      <p className="w-96 text-center text-sm text-zinc-500 dark:text-zinc-400 font-medium">
        Enter a YouTube video link and we'll send it to our AI system for
        analysis.
      </p>
      <Form />
    </main>
  );
};

export default App;
