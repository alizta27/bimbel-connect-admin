import BidForm from '../BidForm'

export default function BidFormExample() {
  return (
    <div className="max-w-2xl">
      <BidForm 
        jobTitle="Desainer UI/UX untuk Aplikasi Mobile E-Commerce"
        tokenCost={3}
        userTokenBalance={25}
        onSubmit={(data) => console.log('Bid submitted:', data)}
      />
    </div>
  );
}
