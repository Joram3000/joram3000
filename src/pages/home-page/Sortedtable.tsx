import { useState } from "react"
import {
  Table,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  Container,
  Anchor,
  Title,
} from "@mantine/core"
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons-react"
import { truncateHttps } from "../../helpers/helpers"
import { useTranslation } from "react-i18next"

interface RowData {
  name: string
  url: string
  typeOf: string
}

interface ThProps {
  children: React.ReactNode
  reversed: boolean
  sorted: boolean
  onSort(): void
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector
  return (
    <Table.Th>
      <UnstyledButton onClick={onSort}>
        <Group justify="space-between">
          <Text fw={700}>{children}</Text>
          <Center>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  )
}
function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query)),
  )
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string },
) {
  const { sortBy } = payload

  if (!sortBy) {
    return filterData(data, payload.search)
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy])
      }

      return a[sortBy].localeCompare(b[sortBy])
    }),
    payload.search,
  )
}

const tableData = [
  {
    name: "Typescript",
    url: "https://typescriptlang.org",
    typeOf: "Language",
  },
  {
    name: "React",
    url: "https://react.dev",
    typeOf: "Library",
  },
  {
    name: "Mantine",
    url: "https://mantine.dev",
    typeOf: "UI",
  },
  {
    name: "Redux",
    url: "https://redux.js.org",
    typeOf: "State Management",
  },
  {
    name: "React Query",
    url: "https://tanstack.com/query",
    typeOf: "State Management",
  },
  {
    name: "React Parallax",
    url: "https://parallax-controller.damnthat.tv",
    typeOf: "Animation",
  },
  { name: "React SVGR", url: "https://react-svgr.com", typeOf: "Utility" },
  {
    name: "React Spring",
    url: "https://react-spring.dev",
    typeOf: "Animation",
  },
  { name: "P5", url: "https://p5js.org", typeOf: "Creative" },
  {
    name: "Tone.js",
    url: "https://tonejs.github.io",
    typeOf: "Audio",
  },
  {
    name: "Wavesurfer.JS",
    url: "https://wavesurfer.xyz",
    typeOf: "Audio",
  },
  {
    name: "Date-fns",
    url: "https://date-fns.org",
    typeOf: "Utility",
  },
  {
    name: "i18n",
    url: "https://i18next.com",
    typeOf: "Utility",
  },
  {
    name: "Ableton Live",
    url: "https://ableton.com",
    typeOf: "DAW",
  },
  {
    name: "DaVinci Resolve",
    url: "https://blackmagicdesign.com",
    typeOf: "Video Editor",
  },
  {
    name: "Jest",
    url: "https://jestjs.io",
    typeOf: "Testing",
  },
  {
    name: "Storybook",
    url: "https://storybook.js.org",
    typeOf: "Prototyping",
  },
  {
    name: "Cypress",
    url: "https://go.cypress.io",
    typeOf: "Testing",
  },
  {
    name: "Papaparse",
    url: "https://papaparse.com  ",
    typeOf: "Utility",
  },
  {
    name: "SendGrid",
    url: "https://docs.sendgrid.com/for-developers",
    typeOf: "E-mail",
  },
]

export function TableSort() {
  const { t } = useTranslation()
  const [search, setSearch] = useState("")
  const [sortedData, setSortedData] = useState(tableData)
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setSortedData(sortData(tableData, { sortBy: field, reversed, search }))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    setSortedData(
      sortData(tableData, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      }),
    )
  }

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>
        <Anchor href={row.url} target="_blank">
          <Text lineClamp={1} td="underline">
            {truncateHttps(row.url)}
          </Text>
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Text lineClamp={2} size="sm">
          {row.typeOf}
        </Text>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <Container p={0}>
      <Group align="flex-end" justify="space-between">
        <Title mb="md" order={2}>
          {t("home.usedSoftware")}
        </Title>

        <TextInput
          placeholder="Search by any field"
          mb="md"
          leftSection={
            <IconSearch
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          value={search}
          onChange={handleSearchChange}
        />
      </Group>
      <Table striped highlightOnHover withTableBorder layout="fixed">
        <Table.Thead>
          <Table.Tr>
            <Th
              sorted={sortBy === "name"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("name")}
            >
              Naam
            </Th>
            <Th
              sorted={sortBy === "url"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("url")}
            >
              URL
            </Th>
            <Th
              sorted={sortBy === "typeOf"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("typeOf")}
            >
              Type
            </Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Container>
  )
}
