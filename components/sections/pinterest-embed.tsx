export function PinterestEmbed() {
  return (
    <section className="flex justify-center px-4 py-12">
      <div className="glass glow-border w-full max-w-[345px] overflow-hidden rounded-2xl">
        <iframe
          src="https://assets.pinterest.com/ext/embed.html?id=786089310038143365"
          width="345"
          height="295"
          frameBorder="0"
          scrolling="no"
          title="Pinterest inspiration"
          className="block w-full"
        />
      </div>
    </section>
  );
}
