import { useState, type FormEvent } from 'react';
import type { EnquiryPayload } from '../../lib/instagram';

interface EnquiryFormProps {
  /** Pre-fills "What are you looking for?" when opened from a bake. */
  initialRequest?: string;
  onSubmit: (payload: EnquiryPayload) => void;
}

type Errors = Partial<Record<'name' | 'request', string>>;

/** Today, as yyyy-mm-dd, so the date picker can't offer the past. */
function todayISO() {
  const d = new Date();
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 10);
}

export function EnquiryForm({ initialRequest = '', onSubmit }: EnquiryFormProps) {
  const [values, setValues] = useState<EnquiryPayload>({
    name: '',
    request: initialRequest,
    date: '',
    size: '',
    message: '',
    instagram: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Errors>({});

  const set = (key: keyof EnquiryPayload) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => (prev[key as keyof Errors] ? { ...prev, [key]: undefined } : prev));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Only the two fields we genuinely cannot proceed without.
    const next: Errors = {};
    if (!values.name.trim()) next.name = 'Please add your name so we know who we’re talking to.';
    if (!values.request.trim()) next.request = 'A line about what you’re after is enough.';

    setErrors(next);

    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      document.getElementById(`enq-${first}`)?.focus();
      return;
    }

    onSubmit(values);
  };

  return (
    <form className="enq" onSubmit={handleSubmit} noValidate>
      <div className="enq__field">
        <label htmlFor="enq-name">Your name</label>
        <input
          id="enq-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={set('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'enq-name-error' : undefined}
          required
        />
        {errors.name && (
          <p className="enq__error" id="enq-name-error" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div className="enq__field">
        <label htmlFor="enq-request">What are you looking for?</label>
        <input
          id="enq-request"
          name="request"
          type="text"
          placeholder="A birthday cake, a wedding tier, something else entirely…"
          value={values.request}
          onChange={set('request')}
          aria-invalid={Boolean(errors.request)}
          aria-describedby={errors.request ? 'enq-request-error' : undefined}
          required
        />
        {errors.request && (
          <p className="enq__error" id="enq-request-error" role="alert">
            {errors.request}
          </p>
        )}
      </div>

      <div className="enq__row">
        <div className="enq__field">
          <label htmlFor="enq-date">When is it for?</label>
          <input
            id="enq-date"
            name="date"
            type="date"
            min={todayISO()}
            value={values.date}
            onChange={set('date')}
          />
        </div>

        <div className="enq__field">
          <label htmlFor="enq-size">How many people?</label>
          <input
            id="enq-size"
            name="size"
            type="text"
            inputMode="numeric"
            placeholder="Roughly is fine"
            value={values.size}
            onChange={set('size')}
          />
        </div>
      </div>

      <div className="enq__field">
        <label htmlFor="enq-message">Anything you&rsquo;d like us to know?</label>
        <textarea
          id="enq-message"
          name="message"
          rows={3}
          placeholder="Flavours, colours, the person it’s for, a photograph you loved…"
          value={values.message}
          onChange={set('message')}
        />
      </div>

      <details className="enq__optional">
        <summary>Add a way to reach you (optional)</summary>
        <div className="enq__row enq__row--optional">
          <div className="enq__field">
            <label htmlFor="enq-instagram">Instagram handle</label>
            <input
              id="enq-instagram"
              name="instagram"
              type="text"
              placeholder="@yourhandle"
              value={values.instagram}
              onChange={set('instagram')}
            />
          </div>

          <div className="enq__field">
            <label htmlFor="enq-phone">Phone</label>
            <input
              id="enq-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={set('phone')}
            />
          </div>
        </div>
      </details>

      <button className="btn btn--solid enq__submit" type="submit">
        Continue
        <span className="btn-arrow" aria-hidden="true">
          →
        </span>
      </button>

      <p className="enq__note">
        Nothing is sent anywhere yet — the next step hands this to you as a message you
        can send us on Instagram.
      </p>
    </form>
  );
}
