"use client";

import { useEffect, useState } from "react";

export type VyraUser = { email: string; name: string; avatar?: string } | null;

export function useAuth() {
  const [user, setUser] = useState<VyraUser>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    (async () => {
      try {
        const { supabase } = await import("./supabase");
        const { data } = await supabase.auth.getSession();
        applySession(data.session);
        const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => applySession(session));
        unsub = () => sub.subscription.unsubscribe();
      } catch {
        /* auth opcional: si falla, la tienda sigue funcionando como invitado */
      } finally {
        setReady(true);
      }
    })();

    function applySession(session: any) {
      if (session?.user) {
        const m = session.user.user_metadata ?? {};
        setUser({
          email: session.user.email ?? "",
          name: m.full_name ?? m.name ?? session.user.email?.split("@")[0] ?? "Cliente",
          avatar: m.avatar_url ?? m.picture,
        });
      } else setUser(null);
    }
    return () => unsub?.();
  }, []);

  async function loginGoogle() {
    const { supabase } = await import("./supabase");
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/vyra-store/" },
    });
  }

  async function logout() {
    const { supabase } = await import("./supabase");
    await supabase.auth.signOut();
    setUser(null);
  }

  return { user, ready, loginGoogle, logout };
}
