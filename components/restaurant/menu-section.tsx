import MenuItem from "./menu-item"

interface MenuSectionProps {
  title: string
  count: number
  items: any[]
  onAddItem: (item: any) => void
}

export default function MenuSection({ title, count, items, onAddItem }: MenuSectionProps) {
  return (
    <div className="border-b border-gray-200 pb-8">
      <h2 className="text-2xl font-serif text-gray-900 mb-6 flex items-center gap-2">
        {title}
        <span className="text-lg text-gray-600">({count})</span>
      </h2>

      <div className="space-y-6">
        {items.map((item) => (
          <MenuItem key={item.id} item={item} onAddItem={onAddItem} />
        ))}
      </div>
    </div>
  )
}
