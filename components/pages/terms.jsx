// src/pages/TermsOfService.jsx

export const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Terms of Service & Liability Disclaimer</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Company Purpose</h2>
        <p>
          Swapskill is a platform that:
          <ul className="list-disc list-inside ml-4">
            <li>Helps users showcase their skills and get hired.</li>
            <li>Provides a paid feature that makes user profiles or skills more visible to potential clients or employers.</li>
            <li>Acts as a facilitator only — Swapskill does <strong>not</strong> employ, contract, or guarantee hiring outcomes.</li>
          </ul>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. No Guarantee of Employment</h2>
        <p>
          By using Swapskill, users acknowledge that:
          <ul className="list-disc list-inside ml-4">
            <li>Swapskill does <strong>not</strong> guarantee they will be hired.</li>
            <li>Swapskill only provides tools to showcase skills and connect with potential clients or employers.</li>
            <li>The success of any hiring or freelance engagement depends solely on the agreement between the user and the third party.</li>
          </ul>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. User Responsibility</h2>
        <p>
          Users are fully responsible for the information they provide.
          They must ensure that their skills, qualifications, and claims are truthful.
          Swapskill is not responsible for verifying the authenticity of user-submitted skills or portfolios.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Payments</h2>
        <p>
          Users may pay a fee to make their skills/profile more visible.
          This payment is for <strong>visibility services only</strong>, not for guaranteed work or employment.
          No refunds are provided if the user does not secure work.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by applicable law:
          Swapskill, its founders, owners, employees, or affiliates are <strong>not liable</strong> for any loss, damage, or legal claim resulting from any interaction, transaction, or communication between users and third parties.
          Swapskill does not assume responsibility for disputes between users and employers/clients.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Jurisdiction</h2>
        <p>
          These terms are governed by the laws of [Your Country].
          Any dispute must be resolved in the courts of [Your Country].
          Users agree that any legal claim must be brought only in the local jurisdiction, not internationally.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Indemnification</h2>
        <p>
          Users agree to indemnify and hold Swapskill harmless against any claims, damages, losses, or expenses (including legal fees) arising out of:
          <ul className="list-disc list-inside ml-4">
            <li>Their misuse of the platform,</li>
            <li>False information provided,</li>
            <li>Disputes with third parties.</li>
          </ul>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">8. Changes to Terms</h2>
        <p>
          Swapskill reserves the right to update these terms.
          Continued use of the platform means acceptance of the updated terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">9. Acceptance</h2>
        <p>
          By signing up for Swapskill, users agree to these terms and confirm that they understand Swapskill is <strong>not responsible</strong> for any hiring outcome, payment disputes, or the truthfulness of user-submitted information.
        </p>
      </section>

      <p className="mt-8 text-sm text-gray-500">
        Last updated: 2025
      </p>
    </div>
  );
}
