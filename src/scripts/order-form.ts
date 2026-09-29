/**
 * Shared plumbing of the order forms (tickets, ID card): price display, the order number,
 * field validation, sending to the endpoint and revealing the confirmation.
 * Markup contract inside `root`: `[data-error="<field>"]` per checked field and `[data-error="send"]`,
 * `[data-submit]` holding `[data-submit-idle]` and `[data-submit-busy]`.
 */

export const money = (n: number) => `${n.toLocaleString("cs-CZ")} CZK`;

/** Order number, numeric so it works as the bank's variable symbol */
export function orderRef() {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return String(10000000 + (a[0] % 90000000));
}

export type Check = {
  key: string;
  ok: () => boolean;
  /** The field that takes focus when it fails */
  field: () => HTMLElement;
  /** Set aria-invalid on the field (off for groups, where the first box only stands in) */
  aria?: boolean;
};

/**
 * One message per field, shown after the first submit and cleared as it is fixed.
 * Returns the submit-time check: it arms the live updates and gives the first bad field.
 */
export function validation(root: HTMLElement, form: HTMLFormElement, checks: Check[], errors: Record<string, string>) {
  let tried = false;
  const run = () => {
    let first: HTMLElement | undefined;
    for (const { key, ok, field, aria = true } of checks) {
      const bad = !ok();
      const el = field();
      if (aria) el.setAttribute("aria-invalid", String(bad));
      root.querySelector(`[data-error="${key}"]`)!.textContent = bad ? errors[key] : "";
      if (bad && !first) first = el;
    }
    return first;
  };
  form.addEventListener("input", () => tried && run());
  form.addEventListener("change", () => tried && run());
  return () => {
    tried = true;
    return run();
  };
}

/** POSTs the order as JSON with the submit button busy; on failure shows `failText` and resolves false */
export async function postOrder(root: HTMLElement, endpoint: string, order: object, failText: string) {
  const button = root.querySelector<HTMLButtonElement>("[data-submit]")!;
  const error = root.querySelector('[data-error="send"]')!;
  const busy = (on: boolean) => {
    button.disabled = on;
    root.querySelector("[data-submit-idle]")!.classList.toggle("hidden", on);
    root.querySelector("[data-submit-busy]")!.classList.toggle("hidden", !on);
  };
  busy(true);
  error.textContent = "";
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(order),
    });
    if (!res.ok) throw new Error(String(res.status));
    return true;
  } catch {
    error.textContent = failText;
    return false;
  } finally {
    busy(false);
  }
}

/** Opens the visitor's mail app with the order and returns the link, for the confirmation's retry button */
export function mailOrder(to: string, subject: string, body: string) {
  const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  location.href = href;
  return href;
}

/** Swaps the form for the confirmation and brings it into view */
export function showDone(form: HTMLFormElement, done: HTMLElement) {
  form.hidden = true;
  done.hidden = false;
  done.focus();
  done.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}
