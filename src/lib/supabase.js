import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
    "https://istxhspvkobhznnlkbss.supabase.co";

const supabaseKey =
    "sb_publishable_B1r-xMonzJV1RjmPaDmY8g_2E1AAN0I";

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);