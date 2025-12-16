"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

export function ConnectionGraph() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 600
    const height = 300

    // Clear previous
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)

    // Data: Student -> Aman -> Rohan
    const nodes = [
      { id: "YOU", group: 1, label: "You (Student)" },
      { id: "AMAN", group: 2, label: "Aman (Alumni)" },
      { id: "ROHAN", group: 3, label: "Rohan (Target)" }
    ]

    const links = [
      { source: "YOU", target: "AMAN" },
      { source: "AMAN", target: "ROHAN" }
    ]

    // Simulation
    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))

    // Arrowhead
    svg.append("defs").selectAll("marker")
      .data(["end"])
      .enter().append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 25)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#94a3b8") // Slate-400

    // Links
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#475569")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)")

    // Nodes
    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .enter().append("g")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any)

    // Node Circles
    node.append("circle")
      .attr("r", 20)
      .attr("fill", (d) => {
        if (d.group === 1) return "#3b82f6" // Blue
        if (d.group === 2) return "#eab308" // Yellow
        return "#06b6d4" // Cyan
      })
      .attr("stroke", "#1e293b")
      .attr("stroke-width", 2)

    // Labels
    node.append("text")
      .text(d => d.label)
      .attr("x", 25)
      .attr("y", 5)
      .attr("fill", "#cbd5e1")
      .style("font-size", "12px")
      .style("font-family", "sans-serif")

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`)
    })

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: any, d: any) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

  }, [])

  return (
    <svg ref={svgRef} className="w-full h-full border border-slate-800 bg-slate-900/50 rounded-lg" />
  )
}
