function FAQ({ faqs }) {
  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-6">FAQs</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </section>
  );
}

export default FAQ;

