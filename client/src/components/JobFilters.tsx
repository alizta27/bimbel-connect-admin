import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useState } from "react";

interface JobFiltersProps {
  onFilterChange?: (filters: any) => void;
}

export default function JobFilters({ onFilterChange }: JobFiltersProps) {
  const [tokenRange, setTokenRange] = useState([1, 10]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    "Design",
    "Programming",
    "Writing",
    "Marketing",
    "Video & Animation",
    "Data Entry",
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    const updated = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter((c) => c !== category);
    setSelectedCategories(updated);
    onFilterChange?.({ categories: updated, tokenRange });
    console.log("Category filter changed:", category, checked);
  };

  const handleTokenRangeChange = (value: number[]) => {
    setTokenRange(value);
    onFilterChange?.({ categories: selectedCategories, tokenRange: value });
    console.log("Token range changed:", value);
  };

  return (
    <Card className="p-6 space-y-6 sticky top-20">
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold text-foreground">Filter Pekerjaan</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Kategori</h4>
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                data-testid={`checkbox-category-${category.toLowerCase()}`}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>

        <div className="space-y-3 pt-4 border-t">
          <h4 className="text-sm font-semibold text-foreground">Biaya Token</h4>
          <div className="space-y-2">
            <Slider
              value={tokenRange}
              onValueChange={handleTokenRangeChange}
              max={10}
              min={1}
              step={1}
              className="w-full"
              data-testid="slider-token-range"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{tokenRange[0]} Token</span>
              <span>{tokenRange[1]} Token</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setSelectedCategories([]);
              setTokenRange([1, 10]);
              onFilterChange?.({ categories: [], tokenRange: [1, 10] });
              console.log("Filters reset");
            }}
            data-testid="button-reset-filters"
          >
            Reset Filter
          </Button>
        </div>
      </div>
    </Card>
  );
}
