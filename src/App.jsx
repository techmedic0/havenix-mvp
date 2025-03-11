import { supabase } from "./utils/supabaseClient";

export default function () {
  console.log(supabase)
    return (
       <h1>Havenix is now connected to Supabase</h1>
    );
}