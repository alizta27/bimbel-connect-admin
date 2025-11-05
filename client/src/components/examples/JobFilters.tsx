import JobFilters from '../JobFilters'

export default function JobFiltersExample() {
  return (
    <div className="max-w-sm">
      <JobFilters onFilterChange={(filters) => console.log('Filters changed:', filters)} />
    </div>
  );
}
