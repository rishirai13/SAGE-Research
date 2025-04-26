"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  Filter, Search, SlidersHorizontal, GridIcon, List, 
  BookOpen, Download, BarChart2, Calendar, ArrowUpDown, 
  ChevronLeft, ChevronRight, X, BookmarkIcon
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ResearchPage() {
  const [view, setView] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDate, setSelectedDate] = useState("newest")
  const [selectedSort, setSelectedSort] = useState("relevance")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [filteredPapers, setFilteredPapers] = useState<typeof researchPapers>([])

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  const cardHover = {
    rest: { 
      scale: 1,
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hover: { 
      scale: 1.02, 
      y: -4,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.2, ease: "easeOut" }
    }
  }

  const researchPapers = [
    {
      id: 1,
      title: "The Impact of Technology on Student Engagement",
      abstract:
        "A comprehensive study on how educational technology affects student participation and learning outcomes.",
      authors: "Johnson, M., Smith, A.",
      date: "Jan 2023",
      category: "Educational Technology",
      tags: ["technology", "engagement", "learning outcomes"],
      citations: 42,
      downloads: 312,
    },
    {
      id: 2,
      title: "Effective Teaching Methods in Online Learning Environments",
      abstract: "This research explores various teaching strategies and their effectiveness in virtual classrooms.",
      authors: "Williams, R., Brown, J.",
      date: "Mar 2023",
      category: "Online Learning",
      tags: ["online learning", "teaching methods", "virtual classroom"],
      citations: 28,
      downloads: 245,
    },
    {
      id: 3,
      title: "Inclusive Education: Strategies for Diverse Learners",
      abstract: "An analysis of approaches to create inclusive learning environments for students with diverse needs.",
      authors: "Garcia, L., Chen, H.",
      date: "Feb 2023",
      category: "Inclusive Education",
      tags: ["inclusion", "diversity", "special education"],
      citations: 35,
      downloads: 278,
    },
    {
      id: 4,
      title: "Assessment Practices in Higher Education",
      abstract:
        "This study examines various assessment methods and their impact on student learning in higher education.",
      authors: "Taylor, S., Anderson, P.",
      date: "Apr 2023",
      category: "Higher Education",
      tags: ["assessment", "higher education", "evaluation"],
      citations: 19,
      downloads: 187,
    },
    {
      id: 5,
      title: "The Role of Artificial Intelligence in Education",
      abstract: "An exploration of current and future applications of AI in educational settings.",
      authors: "Lee, K., Patel, R.",
      date: "May 2023",
      category: "Educational Technology",
      tags: ["artificial intelligence", "technology", "future of education"],
      citations: 53,
      downloads: 426,
    },
    {
      id: 6,
      title: "Developing Critical Thinking Skills Through Project-Based Learning",
      abstract:
        "This research investigates how project-based learning approaches can enhance students' critical thinking abilities.",
      authors: "Martinez, D., Wilson, T.",
      date: "Jun 2023",
      category: "Pedagogy",
      tags: ["critical thinking", "project-based learning", "skill development"],
      citations: 31,
      downloads: 264,
    },
    {
      id: 7,
      title: "Digital Learning Resources for Science Education",
      abstract: "This study evaluates the efficacy of interactive digital resources for science education in K-12 schools.",
      authors: "Roberts, E., Kumar, V.",
      date: "Jul 2023",
      category: "Educational Technology",
      tags: ["science education", "digital resources", "K-12"],
      citations: 22,
      downloads: 198,
    },
    {
      id: 8,
      title: "Student Mental Health: Impact of Learning Environments",
      abstract: "An examination of how different learning environments affect student mental health and academic performance.",
      authors: "Thompson, K., Nguyen, L.",
      date: "Aug 2023",
      category: "Educational Psychology",
      tags: ["mental health", "learning environment", "wellbeing"],
      citations: 47,
      downloads: 352,
    },
    {
      id: 9,
      title: "Peer Learning in Graduate Education",
      abstract: "This research explores the effectiveness of peer learning approaches in graduate-level education.",
      authors: "Patel, S., Wilson, A.",
      date: "Sep 2023",
      category: "Higher Education",
      tags: ["peer learning", "graduate education", "collaboration"],
      citations: 18,
      downloads: 165,
    },
  ]

  // Filter papers based on search query, category, date, sort, and tags
  useEffect(() => {
    let filtered = [...researchPapers]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(paper => 
        paper.title.toLowerCase().includes(query) || 
        paper.abstract.toLowerCase().includes(query) || 
        paper.authors.toLowerCase().includes(query) ||
        paper.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(paper => 
        paper.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory
      )
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(paper => 
        selectedTags.some(tag => paper.tags.includes(tag))
      )
    }

    // Sort by date
    if (selectedDate === "newest") {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else if (selectedDate === "oldest") {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    } else if (selectedDate === "last-month") {
      const lastMonth = new Date()
      lastMonth.setMonth(lastMonth.getMonth() - 1)
      filtered = filtered.filter(paper => new Date(paper.date) >= lastMonth)
    } else if (selectedDate === "last-year") {
      const lastYear = new Date()
      lastYear.setFullYear(lastYear.getFullYear() - 1)
      filtered = filtered.filter(paper => new Date(paper.date) >= lastYear)
    }

    // Sort by relevance/citations/downloads
    if (selectedSort === "citations") {
      filtered.sort((a, b) => b.citations - a.citations)
    } else if (selectedSort === "downloads") {
      filtered.sort((a, b) => b.downloads - a.downloads)
    } else if (selectedSort === "recent") {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }

    setFilteredPapers(filtered)
  }, [searchQuery, selectedCategory, selectedDate, selectedSort, selectedTags])

  // Function to toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedDate("newest")
    setSelectedSort("relevance")
    setSelectedTags([])
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] dark:bg-gray-950">
      <Navbar />
      <main className="flex-grow">
        <section className="py-8 md:py-14">
          <div className="container max-w-7xl mx-auto px-5 md:px-8">
            <motion.div
              className="text-center mb-14"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">Research Explorer</h1>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg md:text-xl">
                Discover groundbreaking educational research and insights
              </p>
            </motion.div>
            
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-5 md:p-6 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full">
                  <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input 
                    type="search" 
                    placeholder="Search for papers, authors, or topics..." 
                    className="w-full pl-10 border-none ring-1 ring-gray-200 dark:ring-gray-700 bg-gray-50 dark:bg-gray-800 h-11 rounded-lg focus-visible:ring-2 focus-visible:ring-primary/30"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 shrink-0">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setView(view === "grid" ? "list" : "grid")}
                          className="h-10 w-10 rounded-lg border-gray-200 dark:border-gray-700"
                        >
                          {view === "grid" ? <List className="h-4 w-4" /> : <GridIcon className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p className="text-xs">Toggle view</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant={showFilters ? "default" : "outline"}
                          size="icon"
                          onClick={() => setShowFilters(!showFilters)}
                          className={`h-10 w-10 rounded-lg ${!showFilters && "border-gray-200 dark:border-gray-700"}`}
                        >
                          <Filter className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p className="text-xs">Toggle filters</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {(searchQuery || selectedCategory !== "all" || selectedDate !== "newest" || selectedSort !== "relevance" || selectedTags.length > 0) && (
                    <Button 
                      variant="ghost" 
                      onClick={clearFilters}
                      className="h-10 px-3 rounded-lg text-sm gap-1.5"
                    >
                      <X className="h-3.5 w-3.5" />
                      Reset
                    </Button>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {showFilters && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                    transition={{ duration: 0.2 }}
                  >
                    <Separator className="my-5" />
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">Category</label>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger className="h-10 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="educational-technology">Educational Technology</SelectItem>
                            <SelectItem value="online-learning">Online Learning</SelectItem>
                            <SelectItem value="inclusive-education">Inclusive Education</SelectItem>
                            <SelectItem value="higher-education">Higher Education</SelectItem>
                            <SelectItem value="pedagogy">Pedagogy</SelectItem>
                            <SelectItem value="educational-psychology">Educational Psychology</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">Date</label>
                        <Select value={selectedDate} onValueChange={setSelectedDate}>
                          <SelectTrigger className="h-10 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                            <SelectValue placeholder="Date" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="newest">Newest First</SelectItem>
                            <SelectItem value="oldest">Oldest First</SelectItem>
                            <SelectItem value="last-month">Last Month</SelectItem>
                            <SelectItem value="last-year">Last Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">Sort By</label>
                        <Select value={selectedSort} onValueChange={setSelectedSort}>
                          <SelectTrigger className="h-10 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                            <SelectValue placeholder="Sort By" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="relevance">Relevance</SelectItem>
                            <SelectItem value="citations">Most Cited</SelectItem>
                            <SelectItem value="downloads">Most Downloaded</SelectItem>
                            <SelectItem value="recent">Recently Added</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-1">
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">Common Tags</label>
                        <div className="flex flex-wrap gap-1.5">
                          {Array.from(new Set(researchPapers.flatMap(p => p.tags)))
                            .sort()
                            .slice(0, 6)
                            .map(tag => (
                              <Badge 
                                key={tag} 
                                variant={selectedTags.includes(tag) ? "default" : "outline"} 
                                className={`rounded-full text-xs cursor-pointer ${
                                  !selectedTags.includes(tag) 
                                    ? "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700" 
                                    : "hover:bg-primary/90"
                                }`}
                                onClick={() => toggleTag(tag)}
                              >
                                {tag}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>
                    
                    {selectedTags.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-5 flex flex-wrap gap-2 items-center"
                      >
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Active tags:</span>
                        {selectedTags.map(tag => (
                          <Badge 
                            key={tag} 
                            className="rounded-full cursor-pointer bg-primary/90 hover:bg-primary gap-1.5 text-xs py-0.5 px-2.5"
                            onClick={() => toggleTag(tag)}
                          >
                            {tag} <X className="h-3 w-3" />
                          </Badge>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {filteredPapers.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-5 flex justify-between items-center"
              >
                <div className="px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800/60 text-sm text-gray-600 dark:text-gray-400">
                  Showing <span className="font-medium text-gray-900 dark:text-white">{filteredPapers.length}</span> results
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-9 text-sm font-normal rounded-lg border-gray-200 dark:border-gray-700 gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Export
                  </Button>
                  <Button size="sm" variant="outline" className="h-9 text-sm font-normal rounded-lg border-gray-200 dark:border-gray-700 gap-1.5">
                    <BookmarkIcon className="h-3.5 w-3.5" />
                    Save
                  </Button>
                </div>
              </motion.div>
            )}

            <div className="mb-12">
              <div className={`${view === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col"} gap-6`}>
                <AnimatePresence mode="popLayout">
                  {filteredPapers.length > 0 ? (
                    filteredPapers.map((paper, i) => (
                      <motion.div
                        key={paper.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3, delay: i * 0.03 }}
                        className={view === "list" ? "w-full" : ""}
                      >
                        <motion.div
                          initial="rest"
                          whileHover="hover"
                          variants={cardHover}
                          className="h-full rounded-xl overflow-hidden"
                        >
                          <Card className={`h-full overflow-hidden border-none bg-white dark:bg-gray-900 shadow-none transition-all ${view === "list" ? "flex flex-col md:flex-row" : ""}`}>
                            <div className={view === "list" ? "md:w-3/4" : ""}>
                              <CardHeader className="relative px-5 md:px-6 pt-5 pb-3">
                                <div className="flex justify-between items-center gap-3 mb-1">
                                  <Badge variant="secondary" className="rounded-full px-2.5 py-0.5 text-xs bg-primary/10 hover:bg-primary/20 text-primary font-medium flex items-center h-5">
                                    {paper.category}
                                  </Badge>
                                  <div className="flex items-center text-xs text-gray-500 gap-1.5">
                                    <Calendar className="h-3 w-3" />
                                    {paper.date}
                                  </div>
                                </div>
                                <CardTitle className="mt-2.5 text-lg font-semibold leading-tight tracking-tight hover:text-primary transition-colors cursor-pointer">
                                  {paper.title}
                                </CardTitle>
                                <div className="mt-1.5 text-xs text-gray-500">
                                  by {paper.authors}
                                </div>
                              </CardHeader>
                              <CardContent className="px-5 md:px-6 py-2">
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{paper.abstract}</p>
                                
                                <div className="mt-5 flex flex-wrap gap-1.5">
                                  {paper.tags.map((tag) => (
                                    <Badge 
                                      key={tag} 
                                      variant={selectedTags.includes(tag) ? "default" : "outline"} 
                                      className={`rounded-full text-xs cursor-pointer ${
                                        !selectedTags.includes(tag) 
                                          ? "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700" 
                                          : "hover:bg-primary/90 bg-primary/90"
                                      }`}
                                      onClick={() => toggleTag(tag)}
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </CardContent>
                            </div>
                            <div className={view === "list" ? "md:w-1/4 px-6 flex flex-col justify-between gap-4" : ""}>
                              {view === "list" ? (
                                <div className="pt-6">
                                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                    <div className="flex items-center gap-1.5">
                                      <BarChart2 className="h-3.5 w-3.5" />
                                      <span>{paper.citations}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <Download className="h-3.5 w-3.5" />
                                      <span>{paper.downloads}</span>
                                    </div>
                                  </div>
                                  <Button 
                                    variant="default" 
                                    size="sm"
                                    className="w-full rounded-lg"
                                  >
                                    <BookOpen className="mr-1.5 h-4 w-4" />
                                    Read Paper
                                  </Button>
                                </div>
                              ) : (
                                <CardFooter className="pt-2 pb-5 px-5 md:px-6 mt-auto border-t border-gray-100 dark:border-gray-800">
                                  <div className="w-full">
                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3.5">
                                      <div className="flex items-center gap-1.5">
                                        <BarChart2 className="h-3.5 w-3.5" />
                                        <span>{paper.citations} Citations</span>
                                      </div>
                                      <div className="flex items-center gap-1.5">
                                        <Download className="h-3.5 w-3.5" />
                                        <span>{paper.downloads} Downloads</span>
                                      </div>
                                    </div>
                                    <Button 
                                      variant="default" 
                                      size="sm"
                                      className="w-full rounded-lg"
                                    >
                                      <BookOpen className="mr-1.5 h-4 w-4" />
                                      Read Paper
                                    </Button>
                                  </div>
                                </CardFooter>
                              )}
                            </div>
                          </Card>
                        </motion.div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div 
                      className="col-span-full text-center py-20 bg-white dark:bg-gray-900 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                        <Search className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">No results found</h3>
                      <p className="text-gray-500 mb-6 max-w-md mx-auto">We couldn't find any papers matching your criteria. Try adjusting your search filters.</p>
                      <Button className="rounded-lg" onClick={clearFilters}>
                        Clear All Filters
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {filteredPapers.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center mb-10"
              >
                <div className="inline-flex items-center rounded-lg bg-white dark:bg-gray-900 p-1.5 shadow-sm">
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md text-gray-500">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-9 w-9 rounded-md text-xs font-medium bg-primary text-white hover:text-white hover:bg-primary/90">
                    1
                  </Button>
                  <Button variant="ghost" size="sm" className="h-9 w-9 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                    2
                  </Button>
                  <Button variant="ghost" size="sm" className="h-9 w-9 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                    3
                  </Button>
                  <span className="mx-1 text-gray-400">...</span>
                  <Button variant="ghost" size="sm" className="h-9 w-9 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                    8
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md text-gray-500">
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next</span>
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
