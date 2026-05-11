export default function BrachPoint() {
  return (
    <>
      <h3 className="block xxs:hidden text-white">default</h3>

      <h3 className="hidden xxs:block xs:hidden text-white">xxs</h3>

      <h3 className="hidden xs:block s:hidden text-white">xs</h3>

      <h3 className="hidden s:block iphone:hidden text-white">s</h3>

      <h3 className="hidden iphone:block mobile:hidden text-white">iphone</h3>
      <h3 className="hidden mobile:block md:hidden text-white">mobile</h3>

      <h3 className="hidden md:block md2:hidden text-white">md</h3>

      <h3 className="hidden md2:block md3:hidden $text-white">md2</h3>

      <h3 className="hidden md3:block tb:hidden text-white">md3</h3>

      <h3 className="hidden tb:block lg:hidden text-white">tb</h3>

      <h3 className="hidden lg:block xl:hidden text-white">lg</h3>

      <h3 className="hidden xl:block 2xl:hidden  text-white">xl</h3>

      <h3 className="hidden 2xl:block 3xl:hidden  text-white">2xl</h3>
      <h3 className="hidden 3xl:block text-white">2xl</h3>
    </>
  );
}
