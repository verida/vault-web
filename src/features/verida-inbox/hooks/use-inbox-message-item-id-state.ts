import { createSerializer, parseAsString, useQueryState } from "nuqs"

export function useInboxMessageItemIdState() {
  const [itemId, setItemId] = useQueryState("itemId", parseAsString)

  const searchParams = {
    itemId: parseAsString,
  }

  const serializeItemId = createSerializer(searchParams)

  return { itemId, setItemId, serializeItemId }
}
